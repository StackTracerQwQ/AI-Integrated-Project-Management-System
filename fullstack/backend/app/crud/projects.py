import uuid
from calendar import monthrange
from datetime import date
from decimal import Decimal

from sqlmodel import Session, col, func, or_, select

from app.models import (
    Client,
    Employee,
    Invoice,
    Project,
    ProjectAssignment,
    ProjectMilestone,
    ProjectSummary,
)


def month_bounds(year: int, month: int) -> tuple[date, date]:
    _, last_day = monthrange(year, month)
    return date(year, month, 1), date(year, month, last_day)


def prev_month(year: int, month: int) -> tuple[int, int]:
    if month == 1:
        return year - 1, 12
    return year, month - 1


def get_project_manager(*, session: Session, project_id: uuid.UUID) -> str | None:
    employees = session.exec(
        select(Employee)
        .join(ProjectAssignment, ProjectAssignment.employee_id == Employee.id)
        .where(ProjectAssignment.project_id == project_id)
    ).all()
    if not employees:
        return None
    for emp in employees:
        if emp.role_title and "manager" in emp.role_title.lower():
            return emp.full_name or f"{emp.first_name} {emp.last_name}".strip()
    emp = employees[0]
    return emp.full_name or f"{emp.first_name} {emp.last_name}".strip()


def build_project_summaries(*, session: Session, projects: list[Project]) -> list[ProjectSummary]:
    today = date.today()
    result = []
    for p in projects:
        client = session.get(Client, p.client_id) if p.client_id else None
        days = (today - p.start_date).days if p.start_date else None
        result.append(
            ProjectSummary(
                project_id=p.id,
                project_name=p.project_name,
                client_name=client.client_name if client else None,
                project_manager_name=get_project_manager(session=session, project_id=p.id),
                days_since_started=days,
            )
        )
    return result


def get_all_active_projects(*, session: Session) -> list[Project]:
    return list(
        session.exec(
            select(Project)
            .where(Project.is_active == True)
            .order_by(col(Project.created_at).desc())
        ).all()
    )


def get_delayed_projects(*, session: Session) -> list[Project]:
    today = date.today()
    delayed_ids = session.exec(
        select(ProjectMilestone.project_id)
        .where(ProjectMilestone.due_date < today)
        .where(ProjectMilestone.is_complete == False)
        .distinct()
    ).all()
    if not delayed_ids:
        return []
    return list(
        session.exec(
            select(Project)
            .where(col(Project.id).in_(delayed_ids))
            .where(Project.is_active == True)
            .order_by(col(Project.created_at).desc())
        ).all()
    )


def count_active_projects(*, session: Session, start: date, end: date) -> int:
    return session.exec(
        select(func.count())
        .select_from(Project)
        .where(Project.is_active == True)
        .where(Project.start_date <= end)
        .where(or_(Project.completion_date == None, Project.completion_date >= start))
    ).one()


def count_completed_projects(*, session: Session, start: date, end: date) -> int:
    return session.exec(
        select(func.count())
        .select_from(Project)
        .where(Project.completion_date >= start)
        .where(Project.completion_date <= end)
    ).one()


def sum_invoices(*, session: Session, start: date, end: date) -> Decimal:
    total = session.exec(
        select(func.sum(Invoice.invoice_amount))
        .where(Invoice.invoice_date >= start)
        .where(Invoice.invoice_date <= end)
    ).one()
    return total or Decimal("0")
