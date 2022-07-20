import { render } from '@testing-library/react';

import FrontendToolsReact from './frontend-tools-react';

describe('FrontendToolsReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontendToolsReact />);
    expect(baseElement).toBeTruthy();
  });
});
