import React, { ReactNode, ReactElement } from 'react';

interface ShowProps {
    children: ReactNode;
}

interface ShowWhenProps {
    isTrue: boolean;
    children: ReactNode;
}

interface ShowElseProps {
    children: ReactNode;
}

const Show: React.FC<ShowProps> & {
    When: React.FC<ShowWhenProps>;
    Else: React.FC<ShowElseProps>;
} = (props) => {
    let when: ReactElement | null = null;
    let otherwise: ReactElement | null = null;
    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) {
            const childProps = child.props as { isTrue?: boolean };
            if (childProps.isTrue === undefined) {
                otherwise = child as ReactElement;
            } else if (!when && childProps.isTrue === true) {
                when = child as ReactElement;
            }
        }
    });
    return when || otherwise || null;
};

const ShowWhen: React.FC<ShowWhenProps> = ({ isTrue, children }) => (isTrue ? (children as ReactElement) : null);
const ShowElse: React.FC<ShowElseProps> = ({ children }) => children as ReactElement

Show.When = ShowWhen;
Show.Else = ShowElse;

export { Show };