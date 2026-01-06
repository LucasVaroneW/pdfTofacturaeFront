# Deploying to Render

This project is configured for deployment on [Render](https://render.com).

## Prerequisites
- A Render account.
- A GitHub repository connected to Render.
- A running backend service (the frontend needs to know where to send API requests).

## Deployment Steps

1.  **Create a New Blueprint**
    - Go to your Render Dashboard.
    - Click **New +** and select **Blueprint**.
    - Connect this repository.

2.  **Configure Environment Variables**
    Render will detect the `render.yaml` file and prompt you for the following environment variables. **You MUST provide these values for the app to work.**

    | Variable | Description | Example |
    | :--- | :--- | :--- |
    | `BACKEND_URL` | The full URL of your deployed backend service. | `https://my-backend-service.onrender.com` |
    | `API_AUTH_TOKEN` | The Basic Auth token for your backend (as configured in `BasicAuthWebSecurityConfig`). | `Basic dXNlcjpwYXNzd29yZA==` |

3.  **Deploy**
    - Click **Apply** to start the deployment.
    - Render will build the Docker image and deploy the frontend.

## Manual Deployment (Docker Web Service)
If you prefer not to use the Blueprint:
1.  Create a new **Web Service**.
2.  Connect your repo.
3.  Select **Docker** as the Runtime.
4.  Add the environment variables (`BACKEND_URL`, `API_AUTH_TOKEN`) in the "Environment" tab.
