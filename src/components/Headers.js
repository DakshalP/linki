import React from 'react';
import { Menu, Label, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const MeetingsHeader = () => (
    <Menu size="large" secondary pointing>
        <Menu.Item as={Link} to="/">
            <Label color="orange" size="big" content="Linki" />
        </Menu.Item>
        <Menu.Item position="right">
            <Button
                content="New Meeting"
                as={Link}
                to="/meetings/new"
                size="large"
                color="orange"
                icon="plus"
            />
        </Menu.Item>
        <Menu.Item>
            {/* <Button
                content="Edit"
                size="large"
                color="orange"
                icon="edit outline"
            /> */}
        </Menu.Item>
        <Menu.Item>
            <Button
                as={Link}
                to="/"
                size="large"
                basic
                color="orange"
                icon="lock"
            />
        </Menu.Item>
    </Menu>
);

const Header = () => (
    <Menu size="large" secondary>
        <Menu.Item as={Link} to="/">
            <Label color="orange" size="big" content="Linki" />
        </Menu.Item>
    </Menu>
);

export default Header;
