export default {
  namespace: 'nnn',
  state: {
    text: 'hello 21ss23123+dva',
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
