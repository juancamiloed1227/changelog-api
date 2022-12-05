# Changelog API Rest
This is the Changelog API Rest built with Node.js. The API provides endpoints for creating and managing users and projects.

## Installation
To install and run the API, follow these steps:

1. Clone this repository on your local machine
2. Install the project dependencies by running `npm install` in your terminal
3. Start the server by running `node index.js` in your terminal

## Endpoints
The API has the following endpoints available:

### Create user
    POST /api/users
This endpoint receives a JSON object with the following fields:
`name`: the name of the new user
`email`: the email of the new user
`password`: the password of the new user
Request body example:

    {
      "name": "Juan Camilo"
      "email": "juan@gmail.com",
      "password": "my_password"
    }
This endpoint returns a JSON object with the newly created user, including their ID and authentication token.

### Authenticate user
    POST /api/auth
This endpoint receives a JSON object with the following fields:
`email`: the email of the user trying to authenticate
`password`: the password of the user trying to authenticate
Request body example:

    {
      "email": "juan@gmail.com",
      "password": "my_password"
    }
    
This endpoint returns a JSON object with the authenticated user, including their authentication token.

### Create project
    POST /api/projects
This endpoint receives a JSON object with the following fields:
`name`: the name of the new project
`updates (optional)`: an array of updates for the new project

Request body example:
    
    {
      "name": "My project",
      "updates": [
        {
          "name": "First update",
          "points": [
            {
                "description": "Description one"
            },
            {
                "description": "Description two"
            }
          ]
        }
      ]
    }
    
This endpoint requires the user to be authenticated by providing a valid `token` in the request headers. It returns a JSON object with the newly created project.

### Get projects
    GET /api/projects
    
This endpoint receives the following query parameters:
`date`: a date string in the format YYYY-MM-DD to filter the projects by date
`creator`: an ID to filter the projects by their creator
`name`: a string to search for projects that contain this string in their name
`page`: the page number to paginate the results (defaults to 1)
`pageSize`: the number of items per page to paginate the results (defaults to 20)

This endpoint requires the user to be authenticated by providing a valid `token` in the request headers. It returns a JSON object with the paginated list of projects matching the provided query parameters.

Example query:

    GET /api/projects?date=2022-01-01&creator=123&name=myproject&page=1&pageSize=10
    
Response:

    {
      "items": [
        {
          "id": 1,
          "name": "My project",
          "creator": 123,
          "date": "2022-01-01",
          "updates": [
            {
              "name": "First update",
              "points": [
                {
                    "description": "Description one"
                },
                {
                    "description": "Description two"
                }
              ]
            }
          ]
        }
      ],
      "page": 1,
      "pageSize": 10,
      "totalPages": 1
    }

### Get project

    GET /api/projects/:id
    
This endpoint receives a `id` parameter in the URL path that specifies the ID of the project to retrieve.

This endpoint requires the user to be authenticated by providing a valid `token` in the request headers. It returns a JSON object with the project matching the provided `id`. If the project does not exist, it returns a 404 Not Found error.

Example query:
    
    GET /api/projects/1

Response:

    {
      "id": 1,
      "name": "My project",
      "creator": 123,
      "date": "2022-01-01",
      "updates": [
            {
                "name": "First update",
                "points": [
                    {
                        "description": "Description one"
                    },
                    {
                        "description": "Description two"
                    }
                ]
            }
        ]
    }

### Update project
    PUT /api/project/:id
    
This endpoint receives a `id` parameter in the URL path that specifies the ID of the project to update. It also receives a JSON object with the following fields:

`name`: the updated name of the project (optional)
`updates`: the updated array of updates for the project (optional)
Request body example:
    
    {
      "name": "My updated project",
      "updates": [
        {
          "name": "First update",
          "points": [
            {
                "description": "First update updated"
            }
          ]
        }
      ]
    }

This endpoint requires the user to be authenticated by providing a valid `token` in the request headers. It returns a JSON object with the updated project. If the project does not exist, it returns a 404 Not Found error.

Example query:
    
    PUT /api/projects/1
Response:    

    {
      "id": 1,
      "name": "My updated project",
      "creator": 123,
      "date": "2022-01-01",
      "updates": [
        {
          "name": "First update",
          "points": [
            {
                "description": "First update updated"
            }
          ]
        }
      ]
    }

### Delete project

    DELETE /api/projects/:id
    
This endpoint receives a `id` parameter in the URL path that specifies the ID of the project to delete.

This endpoint requires the user to be authenticated by providing a valid `token` in the request headers. It returns a JSON object with a success message if the project was deleted. If the project does not exist, it returns a 404 Not Found error.

Example query:

    DELETE /api/projects/1
    
Response:

    {
        "message": "Project deleted"
    }

### Create update

    POST /api/projects/:id/updates
    
This endpoint receives a `id` parameter in the URL path that specifies the ID of the project to which the update will be added. It also receives a JSON object with the following fields:

`name`: the name of the update
`points`: the array of points for the update

Request body example:

    {
      "name": "Third update",
      "points": [
        {
            "description": "First point of third update"
        }
      ]
    }
    
This endpoint requires the user to be authenticated by providing a valid `token` in the request headers. It returns a JSON object with the updated project. If the project does not exist, it returns a 404 Not Found error.

Example query:

    POST /api/projects/1/updates

    {
      "id": 1,
      "name": "My project",
      "creator": 123,
      "date": "2022-01-01",
      "updates": [
        {
          "name": "First update",
          "points": []
        },
        {
          "name": "Second update",
          "points": []
        },
        {
          "name": "Third update",
          "points": [
            {
                "description": "First point of third update"
            }
          ]
        }
      ]
    }
