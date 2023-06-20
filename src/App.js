import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import VerifyUser from './components/auth/VerifyUser';
import Authorization from './components/auth/Authorization';
import Layout from './components/layout/Layout';
import Login from './components/public/Login';
import Register from './components/public/Register';
import AddNewTask from './components/tasks/AddNewTask';
import DeleteTask from './components/tasks/DeleteTask';
import DisplaySingleTask from './components/tasks/DisplaySingleTask';
import DisplayTasks from './components/tasks/DisplayTasks';
import EditTask from './components/tasks/EditTask';
import DeleteUser from './components/users/DeleteUser';
import DisplaySingleUser from './components/users/DisplaySingleUser';
import DisplayUsers from './components/users/DisplayUsers';
import EditUser from './components/users/EditUser';
function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      element: <VerifyUser />,
      children: [
        {
          element: <Authorization
            authorizedRoles = {['User', 'Admin']}
          />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  path: '/dash/tasks/add-new',
                  element: <AddNewTask />
                },
                {
                  path: '/dash/tasks/delete-task/:taskId',
                  element: <DeleteTask />
                },
                {
                  path: '/dash/tasks/display-task/:taskId',
                  element: <DisplaySingleTask />
                },
                {
                  path: '/dash/tasks/display-all-tasks',
                  element: <DisplayTasks />
                },
                {
                  path: '/dash/tasks/edit-task/:taskId',
                  element: <EditTask />
                },
                {
                  path: '/dash/users/delete-user/:userId',
                  element: <DeleteUser />
                },
                {
                  path: '/dash/users/display-user/:userId',
                  element: <DisplaySingleUser />
                },
                {
                  path: '/dash/users/edit-user/:userId',
                  element: <EditUser />
                },
                {
                  element: <Authorization 
                    authorizedRoles = {['Admin']}
                  />,
                  children: [
                    {
                      path: '/dash/users/display-all-users',
                      element: <DisplayUsers />
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
