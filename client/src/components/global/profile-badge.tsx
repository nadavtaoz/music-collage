import { observer } from 'mobx-react-lite';

import userIcon from '../../assets/images/user-icon.svg';
import { userStore } from '../../stores/user-store';

const ProfileBadge = observer(() => {
  const profile = userStore.userProfile;

  return (
    <div className="flex items-center gap-x-3 lg:justify-start">
      <img src={userIcon} className="w-12" />
      <div className="text-sm/6 text-sgreen font-semibold">{profile?.name}</div>
    </div>
  );
});

export default ProfileBadge;
