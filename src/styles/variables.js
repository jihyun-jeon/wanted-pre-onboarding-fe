import { css } from 'styled-components';

const variables = {
  flex: obj => `
    display: flex;
    flex-direction: ${obj?.direction ?? 'row'};
    justify-content: ${obj?.justify ?? 'center'};
    align-items: ${obj?.alignItem ?? 'center'};
  `,

  absoluteCenter: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

export default variables;
