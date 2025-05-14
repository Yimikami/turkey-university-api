# Turkey Universities API Backend

A RESTful API service that provides comprehensive information about universities in Turkey, including their faculties and programs.

## Features

- List all universities in Turkey
- Filter universities by city
- Filter universities by type (Public/Private)
- Get detailed information about a specific university
- Search for faculties across all universities
- Search for programs across all universities

## API Endpoints

| Endpoint                       | Method | Description                                    |
| ------------------------------ | ------ | ---------------------------------------------- |
| `/`                            | GET    | API information and available endpoints        |
| `/api/universities`            | GET    | List all universities                          |
| `/api/universities/:id`        | GET    | Get university by ID                           |
| `/api/universities/city/:city` | GET    | Filter universities by city                    |
| `/api/universities/type/:type` | GET    | Filter universities by type (Devlet/Vakıf)     |
| `/api/search/faculty`          | GET    | Search faculties by name (query param: `name`) |
| `/api/search/program`          | GET    | Search programs by name (query param: `name`)  |

## Data Structure

The API uses a JSON file (`turkey-universities.json`) as its data source with the following structure:

```typescript
interface Program {
  name: string;
}

interface Faculty {
  id: number;
  name: string;
  programs: Program[];
}

interface University {
  id: number;
  name: string;
  type: string;
  city: string;
  website: string;
  address: string;
  logo: string;
  faculties: Faculty[];
}
```
