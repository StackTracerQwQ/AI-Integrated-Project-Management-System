from datetime import date

from fastapi.testclient import TestClient
from sqlmodel import Session

from app.models import Client, Employee, Project, ProjectAssignment, ProjectStatusType, Role


def test_get_project_with_roles(
    client: TestClient, superuser_token_headers: dict[str, str], db: Session
) -> None:
    role = Role(role_name="Project Engineer", description="Engineer role", is_active=True)
    db.add(role)
    db.commit()
    db.refresh(role)

    employee = Employee(
        first_name="Alice",
        last_name="Nguyen",
        full_name="Alice Nguyen",
        role_id=role.id,
        is_active=True,
    )
    db.add(employee)
    db.commit()
    db.refresh(employee)

    client_row = Client(
        client_name="Test Client",
        company_name="Test Company",
        billing_address="123 Test Street",
    )
    db.add(client_row)
    db.commit()
    db.refresh(client_row)

    status = ProjectStatusType(status_name="prelim", description="Preliminary", is_active=True)
    db.add(status)
    db.commit()
    db.refresh(status)

    project = Project(
        job_number="JOB-ROLES-001",
        client_id=client_row.id,
        current_status_id=status.id,
        project_name="Metadata with Roles",
        start_date=date.today(),
        due_date=date.today(),
        is_active=True,
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    assignment = ProjectAssignment(
        project_id=project.id,
        employee_id=employee.id,
        allocation_notes="Project Manager",
    )
    db.add(assignment)
    db.commit()

    response = client.get(
        f"/api/v1/projects/{project.id}/with-roles",
        headers=superuser_token_headers,
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["project_id"] == str(project.id)
    assert payload["job_number"] == "JOB-ROLES-001"
    assert payload["company_name"] == "Test Company"
    assert payload["company_address"] == "123 Test Street"
    assert payload["client_name"] == "Test Client"
    assert payload["status"] == "prelim"
    assert len(payload["assignments"]) == 1
    assert payload["assignments"][0]["employee_name"] == "Alice Nguyen"
    assert payload["assignments"][0]["role_name"] == "Project Engineer"
    assert payload["assignments"][0]["role_in_project"] == "Project Manager"
