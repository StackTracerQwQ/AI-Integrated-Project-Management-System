from app.crud.project_statuses import get_status_type, create_status_type
from app.models import ProjectStatus

from sqlmodel import Session


def ensure_project_status_types(session: Session) -> None:
    for status in ProjectStatus:
        try:
            get_status_type(session=session, status_name=status.value)
        except ValueError:
            create_status_type(session=session, status_name=status.value)