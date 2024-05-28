import { selector } from "recoil";
import userAtom from "../atom/userAtom";

const userSelector = selector({
  key: 'userState', 
  get: ({get}) => {
    const user = get(userAtom);
    return user;
  },
});

export default userSelector;