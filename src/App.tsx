import React from 'react';
import Rooms from './Rooms';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="container xl:w-1/2 mx-auto p-4 text-gray-700 dark:text-gray-50">
                <Rooms />
            </div>
        </QueryClientProvider>
    );
}

export default App;
