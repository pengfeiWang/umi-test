import Link from 'umi/link';
import { connect } from 'dva';

export default connect(state => ({
  global: state.global,
}))(({ dispatch }) => {
  console.log('global dispatch', dispatch, global);
  const click = e => {
    console.log('click::', e);
    dispatch({
      type: 'global/goPath',
      payload: {
        s: 'a',
      },
    });
  };
  return (
    <div>
      <p>首页</p>
      <Link to="/list">Go to list.html</Link>
      <a
        onClick={e => {
          click(e);
        }}
      >
        aa
      </a>
    </div>
  );
});
