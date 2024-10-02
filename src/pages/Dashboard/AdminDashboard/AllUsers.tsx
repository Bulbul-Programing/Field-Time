import React from 'react';
import { useGetAllUserQuery } from '../../../Redux/features/Users/userManagementApi';

const AllUsers = () => {
    const {data} = useGetAllUserQuery('admin')
    console.log(data);
    return (
        <div>
            <h1>All Users</h1>
        </div>
    );
};

export default AllUsers;