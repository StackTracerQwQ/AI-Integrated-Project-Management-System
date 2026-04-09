from app.crud.users import (
    authenticate,
    create_user,
    create_user_with_employee,
    delete_user_and_employee,
    get_all_users_with_roles,
    get_user_by_email,
    get_user_profile,
    get_users,
    update_employee_role,
    update_user,
    DUMMY_HASH,
)
from app.crud.projects import (
    build_project_summaries,
    count_active_projects,
    count_completed_projects,
    get_all_active_projects,
    get_delayed_projects,
    get_project_manager,
    month_bounds,
    prev_month,
    sum_invoices,
)

__all__ = [
    # users
    "authenticate",
    "create_user",
    "create_user_with_employee",
    "delete_user_and_employee",
    "get_all_users_with_roles",
    "get_user_by_email",
    "get_user_profile",
    "get_users",
    "update_employee_role",
    "update_user",
    "DUMMY_HASH",
    # projects
    "build_project_summaries",
    "count_active_projects",
    "count_completed_projects",
    "get_all_active_projects",
    "get_delayed_projects",
    "get_project_manager",
    "month_bounds",
    "prev_month",
    "sum_invoices",
]
