// import assert from 'assert';

export default function(api) {
  return {
    name: 'directoryConfigRoute',
    onChange() {
      api.service.restart(/* why */ 'Config directoryConfigRoute Changed');
    },
  };
}
