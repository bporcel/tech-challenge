import { createGlobalStyle } from 'styled-components';
import Theme from './theme';

const GlobalStyles = createGlobalStyle`
body {
    margin: 0;
    font-family: ${Theme.font.family.roboto};
    font-size: ${Theme.font.size.body1};
}

@font-face {
    font-family: ${Theme.font.family.courier};
    src: url(../../fonts/CourierStd.otf) format(opentype);
    font-weight: normal;
    font-style: normal;
}

.d-flex {
    display: flex;

    &.flex-row {
        flex-direction: row;
    }

    &.flex-column {
        flex-direction: column;
    }

    &.align-items-center {
        align-items: center;
    }

    &.justify-center {
        justify-content: center;
    }

    &.justify-between {
        justify-content: space-between;
    }
}
.pd-1 {
    padding: 1em;
}

.pl-1 {
    padding-left: 1em;
}

.inline-list {
    & li {
        display: inline;
    }
}

.separator {
    border: none;
    background-color: ${Theme.colors.gray};
    height: 1px;
    margin: 0;
}

.mr-0 {
    margin: 0;
}

.pd-0 {
    padding: 0;
}

.bordered {
    border: solid 1px ${Theme.colors.gray};
}

.title {
    font-family: ${Theme.font.family.courier};
    font-weight: 100;
}

.input-form {
    &label,
    input {
        display: block;
    }
}
`;

export default GlobalStyles;
