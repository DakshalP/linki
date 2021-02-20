import React, { useState } from 'react';
import { Menu, Label, Button, Popup, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const MeetingsHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
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
                <Popup
                    flowing
                    onClose={() => setMenuOpen(false)}
                    trigger={
                        <Button
                            size="large"
                            basic={!menuOpen}
                            color="orange"
                            icon={menuOpen ? 'close' : 'bars'}
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    }
                    content={
                        <>
                            <Grid centered columns="equal">
                                <Grid.Column textAlign="center">
                                    <Button
                                        as={Link}
                                        to="/"
                                        size="big"
                                        basic
                                        color="orange"
                                        icon="lock"
                                    />
                                </Grid.Column>
                                {/* <Grid.Column textAlign="center">
                                    <Button
                                        size="big"
                                        basic
                                        color="orange"
                                        icon="save"
                                    />
                                </Grid.Column>
                                <Grid.Column textAlign="center">
                                    <Popup
                                        content="Click here to export or import your meetings."
                                        mouseEnterDelay={200}
                                        mouseLeaveDelay={200}
                                        on="hover"
                                        position="bottom center"
                                        trigger={
                                            <Button
                                                size="big"
                                                basic
                                                color="grey"
                                                icon="share"
                                            />
                                        }
                                    />
                                </Grid.Column> */}
                                <Grid.Column textAlign="center">
                                    <Button
                                        size="big"
                                        basic
                                        // color="grey"
                                        icon="github"
                                        onClick={() =>
                                            window.open(
                                                'https://github.com/DakshalP/linki'
                                            )
                                        }
                                    />
                                </Grid.Column>
                            </Grid>
                        </>
                    }
                    on="click"
                    position="bottom left"
                />
            </Menu.Item>
        </Menu>
    );
};

const Header = () => (
    <Menu size="large" secondary>
        <Menu.Item as={Link} to="/">
            <Label color="orange" size="big" content="Linki" />
        </Menu.Item>
    </Menu>
);

export default Header;
