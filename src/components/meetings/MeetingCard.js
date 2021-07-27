import React, { useState } from 'react';
import { Card, Button, Divider, Label, Icon, Popup } from 'semantic-ui-react';
import styles from '../../styles/meetings.module.scss';

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
    onEdit,
    isSecondary,
}) => {
    const [showPass, setShowPass] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleLaunch = () => {
        if (pass) {
            copyToClipboard(pass);
            setCopied(true);

            setTimeout(() => {
                window.open(link);
                setCopied(false);
            }, 600);
        } else window.open(link);
    };

    const description = (
        <>
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
        </>
    );

    const header = (
        <>
            <div className={styles.dropdown}>
                <Popup
                    trigger={
                        <Icon
                            className={styles.dropdownIcon}
                            color="black"
                            name="angle down"
                        />
                    }
                    content={
                        <div className={styles.dropdownMenu}>
                            <p onClick={() => onEdit(_id)}>
                                <Icon name="edit" />
                                Edit
                            </p>
                            <Divider />
                            <p onClick={() => copyToClipboard(link)}>
                                <Icon name="chain" />
                                Copy link
                            </p>
                            {pass ? (
                                <>
                                    <Divider />
                                    <p onClick={() => copyToClipboard(pass)}>
                                        <Icon name="eye" />
                                        Copy pass
                                    </p>
                                </>
                            ) : null}
                        </div>
                    }
                    on="click"
                    position="bottom"
                />
            </div>

            {/* meeting title */}
            <h2 style={{ margin: 0 }}>{name}</h2>
        </>
    );

    return (
        <Card
            fluid={isSecondary}
            color={color || 'orange'}
            header={header}
            meta={time ? time : null}
            description={description}
            style={{ margin: 0, height: '235px' }}
            extra={
                <Button
                    onClick={handleLaunch}
                    fluid
                    size="large"
                    color={color || 'orange'}
                    content={copied ? 'Password copied!' : 'Launch'}
                    icon={copied ? 'check' : 'rocket'}
                />
            }
        />
    );
};

export default MeetingCard;
