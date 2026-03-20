# Jira List Stories
> List all my stories in a Jira project with their key details.

##
Objective
- Fetch and display a list of all Jira stories assigned to the user in a specific project.
- For each story, show key details: Key, Summary, Status, Priority, and etcs.

## Input
- **Jira Project Key:** (e.g. ECS)

## Workflow
1. Fetch all Jira issues of type "Story" assigned to the user in the specified project
2. For each story, extract and display the following details:
    - **Key:** The unique identifier of the story (e.g. ECS-7)
    - **Summary:** A brief description of the story
    - **Status:** Current status of the story (e.g. To Do, In Progress
    - **Priority:** The priority level of the story (e.g. High, Medium, Low)
3. Present the list in a clear and organized format for easy review