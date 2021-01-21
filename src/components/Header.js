import React from 'react';
import { Menu, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = () => (
    <Menu size="large" secondary>
        <Menu.Item as={Link} to="/">
            <Label color="orange" size="big" content="Linki" />
        </Menu.Item>
    </Menu>
);

export default Header;
