export default {
  namespace: 'global',
  state: {
    text: 'hello 2123123+dva',
  },
  effects: {
    *goPath({ payload }, { put }) {
      // eslint-disable-line
      // yield put();
      console.log('effects::', payload);
    },
  },
  reducers: {
    setText() {
      return {
        text: 'setted3',
      };
    },
  },
};
