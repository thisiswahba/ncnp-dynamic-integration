import { createBrowserRouter, RouterProvider } from 'react-router';
import { RootLayout } from '@/app/components/root-layout';
import { AdminLayout } from '@/app/components/admin-layout';
import { DataSourcesPage } from '@/app/pages/data-sources-page';
import { AddDataSourcePage } from '@/app/pages/add-data-source-page';
import { ConfigureEndpointsPage } from '@/app/pages/configure-endpoints-page';
import { DataSourceDetailsPage } from '@/app/pages/data-source-details-page';
import { AddEndpointPage } from '@/app/pages/add-endpoint-page';
import { EditEndpointPage } from '@/app/pages/edit-endpoint-page';
import { TestEndpointPage } from '@/app/pages/test-endpoint-page';
import { EnrollDataSourcePage } from '@/app/pages/enroll-data-source-page';
import { QueriesPage } from '@/app/pages/queries-page';
import { CreateQueryPage } from '@/app/pages/create-query-page';
import { QueryDetailsPage } from '@/app/pages/query-details-page';
import { QueryPreviewPage } from '@/app/pages/query-preview-page';
import { QueryHistoryPage } from '@/app/pages/query-history-page';
import { ExecutionResultsPage } from '@/app/pages/execution-results-page';
import { Navigate } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/data-sources" replace />
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/data-sources" replace />
          },
          {
            path: 'data-sources',
            element: <DataSourcesPage />
          },
          {
            path: 'data-sources/add',
            element: <AddDataSourcePage />
          },
          {
            path: 'data-sources/configure-endpoints',
            element: <ConfigureEndpointsPage />
          },
          {
            path: 'data-sources/:id',
            element: <DataSourceDetailsPage />
          },
          {
            path: 'data-sources/:id/add-endpoint',
            element: <AddEndpointPage />
          },
          {
            path: 'data-sources/:id/edit-endpoint/:endpointId',
            element: <EditEndpointPage />
          },
          {
            path: 'data-sources/:id/test-endpoint/:endpointId',
            element: <TestEndpointPage />
          },
          {
            path: 'data-sources/:id/enroll',
            element: <EnrollDataSourcePage />
          },
          {
            path: 'queries',
            element: <QueriesPage />
          },
          {
            path: 'queries/create',
            element: <CreateQueryPage />
          },
          {
            path: 'queries/history',
            element: <QueryHistoryPage />
          },
          {
            path: 'queries/results/:id',
            element: <ExecutionResultsPage />
          },
          {
            path: 'queries/:id',
            element: <QueryDetailsPage />
          },
          {
            path: 'queries/:id/preview',
            element: <QueryPreviewPage />
          },
          {
            path: 'queries/:id/edit',
            element: <CreateQueryPage />
          }
        ]
      }
    ]
  }
]);

export function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}