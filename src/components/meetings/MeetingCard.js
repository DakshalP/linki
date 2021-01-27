import React, { useState } from 'react';
import { Card, Button, Divider, Label, Transition } from 'semantic-ui-react';

function copyToClipboard(value) {
    var tempInput = document.createElement('input');
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
}

const MeetingCard = ({
    _id,
    name,
    link,
    pass,
    color,
    time,
    editMode,
    onEdit,
}) => {
    const [showPass, setShowPass] = useState(false);
    const [copied, setCopied] = useState(false);

    const description = (
        <>
            <Transition visible={editMode} animation="zoom" duration={500}>
                <Label
                    as="a"
                    basic
                    floating
                    content="✏️"
                    size="big"
                    color="orange"
                    circular
                    onClick={() => onEdit(_id)}
                />
            </Transition>
            <Divider hidden />
            {pass ? (
                <>
                    <Label
                        onClick={() => {
                            setShowPass(!showPass);
                        }}
                        basic
                        color={color || 'orange'}
                        as="a"
                        content={showPass ? pass : pass.replaceAll(/./g, '●')}
                        icon={showPass ? 'eye' : 'eye slash'}
                    />
                </>
            ) : null}
            <Label
                onClick={() => {
                    copyToClipboard(link);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 400);
                }}
                as="a"
                color="grey"
                basic
                content={copied ? 'Link copied!' : 'Copy'}
                icon={copied ? 'check' : 'clipboard'}
            />
        </>
    );

    return (
        <Card
            color={color || 'orange'}
            header={<h2 style={{ margin: 0 }}>{name}</h2>}
            meta={time ? time : null}
            description={description}
            extra={
                <Button
                    onClick={() => {
                        window.open(link);
                    }}
                    fluid
                    size="large"
                    color={color || 'orange'}
                    content={'Launch'}
                    icon="rocket"
                />
            }
        />
    );
};

export default MeetingCard;
