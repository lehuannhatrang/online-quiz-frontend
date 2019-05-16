import React from 'react';
import { Drawer, Input } from 'antd';

const Search = Input.Search;

export const SearchBar = (props) => {
    return (
        <Drawer
            closable={false} onClose={props.onClose}
            placement="top" visible={props.visible} height={60}
            getContainer=".right-layout"
            bodyStyle={{
                width: '1166px',
                padding: '15px 50px',
            }}
       >
            <Search placeholder="Search Text..." onSearch={value => console.log(value)} enterButton />
        </Drawer>
    )
};