import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './components/public/Login';
import Register from './components/public/Register';
import AddNewTask from './components/tasks/AddNewTask';
import DisplaySingleTask from './components/tasks/DisplaySingleTask';
import DisplayTasks from './components/tasks/DisplayTasks';
import EditTask from './components/tasks/EditTask';
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
      path: '/dash',
      element: <Layout />,
      children: [
        {
          path: '/dash/tasks/add-new',
          element: <AddNewTask />
        },
        {
          path: '/dash/tasks/display-task',
          element: <DisplaySingleTask />
        },
        {
          path: '/dash/tasks/display-all-tasks',
          element: <DisplayTasks
            authRoles = {['User', 'Admin']} />
        },
        {
          path: '/dash/tasks/edit-task',
          element: <EditTask />
        },
        {
          path: '/dash/users/display-user',
          element: <DisplaySingleUser />
        },
        {
          path: '/dash/users/display-all-users',
          element: <DisplayUsers />
        },
        {
          path: '/dash/users/edit-user',
          element: <EditUser />
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
