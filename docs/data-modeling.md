# Identity and Management Service

## Data Modeling

### Policies

- policy_id
- policy_name
- kingdom
- resource
- action
- level

### Roles

- role_id
- role_name
- kingdom
- Policies[]

### Groups

- group_id
- group_name
- kingdom
- roles[]

### Users

- user_id
- username
- full_name
- email_address
- phone_number
- date_of_birth
- gender
- organization_name
- department
- job_title
- employee_id
- reports_to
- address
- city
- state
- country
- postal_code
- kingdom
- roles[]
- groups[]

### Kingdom

- kingdom_id
- kingdom_name
- jwt_public_key
- jwt_private_key
- jwt_algorithm
- jwt_expiresIn
- jwt_issuer
