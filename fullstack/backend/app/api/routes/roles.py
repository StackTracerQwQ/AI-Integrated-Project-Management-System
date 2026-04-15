import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Message,
    Role,
    RoleCreate,
    RolePublic,
    RolesPublic,
    RoleUpdate,
)

router = APIRouter()


@router.get("/", response_model=RolesPublic)
def list_roles(session: SessionDep, current_user: CurrentUser) -> Any:
    count = session.exec(select(func.count()).select_from(Role)).one()
    roles = session.exec(select(Role)).all()
    return RolesPublic(data=roles, count=count)


@router.post("/", response_model=RolePublic)
def create_role(
    *, session: SessionDep, current_user: CurrentUser, body: RoleCreate
) -> Any:
    existing = session.exec(select(Role).where(Role.role_name == body.role_name)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role name already exists")
    role = Role.model_validate(body)
    session.add(role)
    session.commit()
    session.refresh(role)
    return role


@router.get("/{role_id}", response_model=RolePublic)
def get_role(
    *, session: SessionDep, current_user: CurrentUser, role_id: uuid.UUID
) -> Any:
    role = session.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role


@router.put("/{role_id}", response_model=RolePublic)
def update_role(
    *, session: SessionDep, current_user: CurrentUser, role_id: uuid.UUID, body: RoleUpdate
) -> Any:
    role = session.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    role_data = body.model_dump(exclude_unset=True)
    role.sqlmodel_update(role_data)
    session.add(role)
    session.commit()
    session.refresh(role)
    return role


@router.delete("/{role_id}", response_model=Message)
def delete_role(
    *, session: SessionDep, current_user: CurrentUser, role_id: uuid.UUID
) -> Any:
    role = session.get(Role, role_id)
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    session.delete(role)
    session.commit()
    return Message(message="Role deleted successfully")