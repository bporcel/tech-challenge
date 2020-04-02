import { createGlobalStyle } from 'styled-components';
import Theme from './theme';
// @ts-ignore
import CourierStd from '../../fonts/CourierStd.otf';

const GlobalStyles = createGlobalStyle`
body {
    margin: 0;
    font-family: ${Theme.font.family.roboto};
    font-size: ${Theme.font.size.body1};
}
html{
    background-color: ${Theme.colors.lightGray}
}

@font-face {
    font-family: ${Theme.font.family.courier};
    src: url(${CourierStd}) format('opentype');
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
    
    &.align-items-baseline {
        align-items: baseline;
    }

    &.justify-center {
        justify-content: center;
    }

    &.justify-between {
        justify-content: space-between;
    }
    
    &.align-items-end{
        align-items: flex-end;
    }
}
.pd-1 {
    padding: 1em;
}

.pl-1 {
    padding-left: 1em;
}

.mr-0 {
    margin: 0;
}

.pd-0 {
    padding: 0;
}

.mb-1 {
    margin-bottom: 1em;
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

.bordered {
    border: solid 1px ${Theme.colors.gray};
}

.rounded {
    border-radius: 1em;
}

.title {
    font-family: ${Theme.font.family.courier};
    font-weight: 100;
}

.bold {
    font-weight: bold;
}
`;

export default GlobalStyles;
