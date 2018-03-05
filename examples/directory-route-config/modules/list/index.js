import router from 'umi/router';

export default () => {
  return (
    <div>
      <p>列表页</p>
      <a
        onClick={() => {
          router.goBack();
        }}
      >
        goBack
      </a>
    </div>
  );
};
