import { createSelector } from "reselect";
import getStatus from "../functions/getFetchStatus";

export default createSelector(
  [state => state.user.referral],
  referral => transform(referral)
);

const transform = referral => {
  const data = transformData(referral.data);
  return {
    data,
    status: getStatus(referral.status)
  };
};

const transformData = ({
  title,
  description,
  policy,
  image,
  fontSize,
  color,
  left,
  top,
  gallery,
  video,
  urls,
  setter,
  getter,
  isPercentage,
  isPoint,
  expiration,
  message
}) => ({
  title,
  description,
  policy,
  image,
  fontSize,
  color,
  left,
  top,
  gallery,
  video,
  urls,
  setter,
  getter,
  isPercentage,
  isPoint,
  expiration,
  message
});
