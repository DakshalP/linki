import React from 'react';
import { Input, Header, Button, Form, Segment, Icon } from 'semantic-ui-react';
import authStyles from '../styles/auth.module.scss';

const Unlock = ({ setKey }) => {
    const handleInput = (e) => {
        setKey(e.target.value);
    };

    return (
        <div className={authStyles.authForm}>
            <Segment styles="minWidth: 20vw">
                <Form>
                    <Segment textAlign="center" basic>
                        <Icon size="massive" name="lock"></Icon>
                        <Header as="h3">
                            Enter your passkey to unlock your link vault.
                        </Header>
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
                        content="Unlock"
                        icon="unlock"
                        color="orange"
                        size="big"
                        type="submit"
                    />
                </Form>
            </Segment>
        </div>
    );
};

export default Unlock;
