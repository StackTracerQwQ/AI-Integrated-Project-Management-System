from datetime import date
from typing import Any

from fastapi import APIRouter, Depends, HTTPException

from app import crud
from app.api.deps import SessionDep, get_current_active_superuser
from app.models import (
    MonthlyCountResponse,
    MonthlyInvoiceResponse,
    ProjectsListResponse,
    ProjectCreateRequest,
    ProjectCreateResponse
)

router = APIRouter(prefix="/projects", tags=["projects"])


@router.post("", response_model=ProjectCreateResponse)
def create_project(project: ProjectCreateRequest, session: SessionDep) -> ProjectCreateResponse:
    existing_project = crud.get_project_by_job_number(session=session, job_number=project.job_number)
    if existing_project:
        raise HTTPException(
            status_code=409,
            detail="A project with this job_number already exists",
        )
    
    created_project = crud.create_project(session=session, project_data=project)
    return ProjectCreateResponse(project_id=created_project.id, message="Project created successfully")


# For testing purposes, will likely be removed in production
@router.get(
    "",
    response_model=ProjectsListResponse,
)
def get_all_projects(session: SessionDep) -> Any:
    projects = crud.get_all_active_projects(session=session)
    summaries = crud.build_project_summaries(session=session, projects=projects)
    return ProjectsListResponse(data=summaries, count=len(summaries))

@router.get(
    "/all-project",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProjectsListResponse,
)
def get_all_projects(session: SessionDep) -> Any:
    projects = crud.get_all_active_projects(session=session)
    summaries = crud.build_project_summaries(session=session, projects=projects)
    return ProjectsListResponse(data=summaries, count=len(summaries))


@router.get(
    "/delay-project",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProjectsListResponse,
)
def get_delayed_projects(session: SessionDep) -> Any:
    projects = crud.get_delayed_projects(session=session)
    summaries = crud.build_project_summaries(session=session, projects=projects)
    return ProjectsListResponse(data=summaries, count=len(summaries))


@router.get(
    "/current-project-num",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=MonthlyCountResponse,
)
def get_current_project_count(session: SessionDep) -> Any:
    today = date.today()
    cur_start, cur_end = crud.month_bounds(today.year, today.month)
    prev_start, prev_end = crud.month_bounds(*crud.prev_month(today.year, today.month))
    return MonthlyCountResponse(
        current_month=crud.count_active_projects(session=session, start=cur_start, end=cur_end),
        previous_month=crud.count_active_projects(session=session, start=prev_start, end=prev_end),
    )


@router.get(
    "/completed-project",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=MonthlyCountResponse,
)
def get_completed_project_count(session: SessionDep) -> Any:
    today = date.today()
    cur_start, cur_end = crud.month_bounds(today.year, today.month)
    prev_start, prev_end = crud.month_bounds(*crud.prev_month(today.year, today.month))
    return MonthlyCountResponse(
        current_month=crud.count_completed_projects(session=session, start=cur_start, end=cur_end),
        previous_month=crud.count_completed_projects(session=session, start=prev_start, end=prev_end),
    )


@router.get(
    "/invoice-bill",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=MonthlyInvoiceResponse,
)
def get_invoice_bill(session: SessionDep) -> Any:
    today = date.today()
    cur_start, cur_end = crud.month_bounds(today.year, today.month)
    prev_start, prev_end = crud.month_bounds(*crud.prev_month(today.year, today.month))
    return MonthlyInvoiceResponse(
        current_month_total=crud.sum_invoices(session=session, start=cur_start, end=cur_end),
        previous_month_total=crud.sum_invoices(session=session, start=prev_start, end=prev_end),
    )
