import React from 'react';
import { Input, Header, Button, Form, Segment, Icon } from 'semantic-ui-react';
import authStyles from '../styles/auth.module.scss';

const FirstLock = ({ setKey }) => {
    const handleInput = (e) => {
        setKey(e.target.value);
    };

    return (
        <div className={authStyles.authForm}>
            <Segment styles="minWidth: 20vw">
                <Form>
                    <Segment textAlign="center" basic>
                        <Icon size="massive" name="key"></Icon>
                        <Header as="h2">Create a Passkey</Header>
                        <p>
                            You will provide this key to access your links in
                            the future. <br />
                            Make sure that it is secure.
                        </p>
                    </Segment>
                    <Form.Field>
                        <Input
                            onChange={handleInput}
                            placeholder="Key"
                            type="password"
                            size="huge"
                        />
                    </Form.Field>
                    <Button
                        content="Create Link Vault"
                        icon="lock"
                        color="orange"
                        size="big"
                        type="submit"
                    />
                </Form>
            </Segment>
        </div>
    );
};

export default FirstLock;
