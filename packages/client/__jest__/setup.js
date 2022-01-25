import "@testing-library/jest-dom";
import React from "react";

import server from "./serverHandlers";

global.React = React;

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
