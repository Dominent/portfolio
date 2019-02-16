import React from 'react'

const Icon = ({ fab, fas, size, href, style }) => {
    return (
        <React.Fragment>
            <a href={href} style={{ ...styles.link, ...style }}>
                <i
                    className={`${!!fas ? 'fas' : 'fab'} fa-${!!fas ? fas : fab}`}
                    style={styles.main(size)}
                />
            </a>

        </React.Fragment>
    )
}

const styles = {
    main: (size) => ({
        fontSize: `${size}rem`
    }),
    link: {
        color: 'inherit',
        padding: '2%'
    }
}

export default Icon;
