# GEMINI.md - n8n Workflow Generation Context

## Project Mission
To empower the AI assistant to generate world-class, error-free **n8n workflows** by leveraging the **n8n MCP Server** and adhering to the best practices defined in **n8n-skills**. The goal is to create workflows that are robust, valid, and follow proven architectural patterns.

## Tool Usage: n8n MCP Server
You have access to the `n8n` MCP server. You **MUST** use these tools to interact with the n8n instance.

### Core Tools
*   **`n8n.n8n_create_workflow`**: The primary tool for creating new workflows. Use this to implement the designs you generate.
*   **`n8n.n8n_test_workflow`**: Use this to verify your workflows work as expected. Auto-detects triggers (webhook, chat, etc.).
*   **`n8n.search_nodes`**: **ALWAYS** use this before adding a node to find the correct node type and configuration options.
    *   *Tip*: Use `source: 'verified'` to find official nodes.
*   **`n8n.get_node`**: Use this to get detailed properties for a specific node type. 
    *   *Tip*: Use `mode: 'docs'` to read how to use a node.
*   **`n8n.validate_node`**: Use this to check if your node configuration is valid.
    *   *Requirement*: Use `mode: 'full'` for comprehensive validation.
*   **`n8n.n8n_list_workflows`**: To check existing workflows.

## Skills & Best Practices
You **MUST** follow these principles derived from the `n8n-skills` repository to ensure "flawless" workflows.

### 1. n8n Expression Syntax
*   **Data Access**:
    *   **Webhooks**: Access body data via `$json.body` (e.g., `$json.body.user_id`), NOT just `$json.user_id`.
    *   **Standard**: Access item data via `$json`.
*   **Variables**: Use `$now` for time, `$env` for environment variables.

### 2. Workflow Patterns
Identify the user's need and select one of these 5 proven patterns:
1.  **Webhook Processing**: Receive data -> Process -> Respond (using `Webhook` and `Respond to Webhook` nodes).
2.  **HTTP API**: Chained HTTP Requests to external services.
3.  **Database**: Read/Write operations (e.g., Postgres, MySQL).
4.  **AI Agent**: Using AI Agent nodes with tools.
5.  **Scheduled**: Triggered by time/cron (using `Schedule` trigger).

### 3. Code Nodes (JavaScript vs Python)
*   **Language Preference**: **ALWAYS prefer JavaScript** (95% of use cases). Only use Python if absolutely necessary (e.g., specific advanced math libraries not available in JS).
*   **Return Format**: Code nodes **MUST** return an array of objects wrapping the JSON: `[{json: { key: value, ... }}]`.
    *   *Incorrect*: `return { key: value }`
    *   *Correct*: `return [{json: { key: value }}]`
*   **Helpers**: Use `$helpers.httpRequest()` for HTTP calls inside code nodes.

### 4. Node Configuration
*   **Smart Parameters**: Be aware of parameter dependencies (e.g., setting `contentType` might be required before `sendBody` is visible).
*   **Validation**: Start with `mode: 'minimal'` validation, but always aim to pass `mode: 'full'` before finalizing.

## Advanced Workflow Process

### 1. Template Discovery (FIRST)
**ALWAYS** check templates before building from scratch.
*   **Search**: `n8n.search_templates({searchMode: 'by_metadata', complexity: 'simple'})` or `n8n.search_templates({query: 'slack'})`.
*   **Strategy**: Filter by role, complexity, or service to find a starting point.

### 2. Validation Strategy (Multi-Level)
*   **Level 1 (Quick)**: `n8n.validate_node({nodeType, config, mode: 'minimal'})` - Required fields check (<100ms).
*   **Level 2 (Comprehensive)**: `n8n.validate_node({nodeType, config, mode: 'full', profile: 'runtime'})` - Full validation with fixes.
*   **Level 3 (Workflow)**: `n8n.validate_workflow(workflow)` - Check connections and expressions.
*   **Level 4 (Post-Deploy)**: `n8n.n8n_validate_workflow({id})` - Validate deployed workflow.

### 3. Critical Configuration Rules
*   **Never Trust Defaults**: Explicitly configure ALL parameters. Defaults are the #1 source of runtime failures.
*   **Batch Updates**: Use `n8n.n8n_update_partial_workflow` with multiple operations in a single call.
*   **Connection Syntax**: `addConnection` requires **four strings**: `source`, `target`, `sourcePort` (usually "main"), `targetPort` (usually "main").
    *   **IF Nodes**: Use `branch: "true"` or `branch: "false"` parameter for connections from IF nodes.

## Workflow Creation Process
Follow this step-by-step process:

1.  **Analyze & Plan**: Identify pattern (Webhook, API, etc.).
2.  **Discovery**: 
    - Search templates first.
    - Search nodes (`n8n.search_nodes`) using `includeExamples: true`.
3.  **Discovery & Config**:
    - Get node details (`n8n.get_node` with `mode: 'docs'` or `detail: 'standard'`).
4.  **Implementation**:
    - Build validation-first.
    - Create workflow (`n8n.n8n_create_workflow`).
5.  **Refinement**:
    - Validate (`n8n.n8n_test_workflow`).
    - Fix errors using `n8n.validate_node` loops.

