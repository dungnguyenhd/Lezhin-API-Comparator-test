import React from 'react';
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import JsonCompare from '../lib/index.js';
import compareService from './services/compareService.js';
import './style.css';
import { isEqual } from 'lodash';
import './mystyle.scss';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBeta, setIsLoadingBeta] = useState(false);
  const [isLoadingAlpha, setIsLoadingAlpha] = useState(false);
  const [stateLogin, setStateLogin] = useState({ username: "", password: "" });
  const [socialType, setSocialType] = useState("facebook");
  const [socialTypePut, setSocialTypePut] = useState("facebook");
  const [socialTypeDel, setSocialTypeDel] = useState("facebook");
  const [isAutoPut, setIsAutoPut] = useState(false);
  const [isAutoPost, setIsAutoPost] = useState(false);
  const [isAutoDel, setIsAutoDel] = useState(false);
  const [putUserMe, setPutUserMe] = useState({ locale: null, isAdultFilterOn: true, birthDate: null, gender: null, agreements: { marketingEmail: true, collectingBirth: true, timer: true, subscription: true } });
  const [locale, setLocale] = useState('ko-KR');
  const [putUserPassword, setPutUserPassword] = useState({ password: 'lezhin123!', newPassword: null });
  const [putUserUsername, setPutUserUsername] = useState({ username: null, password: 'lezhin123!' });
  const [putUserSocial, setPutUserSocial] = useState({ accessToken: null });
  const [putUnregister, setPutUnregister] = useState(null);
  const [usernameSearch, setUsernameSearch] = useState(null);
  const [putVerificationsDataAlpha, setPutVerificationsDataAlpha] = useState({ email: verificationEmail, token: null });
  const [putVerificationsDataBeta, setPutVerificationsDataBeta] = useState({ email: verificationEmail, token: null });
  const [postSignupAlpha, setPostSignupApha] = useState({ agreements: { marketingEmail: false, collectingBirth: false }, birthDate: null, gender: null, account: { username: verificationEmail, password: null }, verificationToken: putVerificationsDataAlpha.token });
  const [postSignupBeta, setPostSignupBeta] = useState({ agreements: { marketingEmail: false, collectingBirth: false }, birthDate: null, gender: null, account: { username: verificationEmail, password: null }, verificationToken: putVerificationsDataBeta.token });
  const [verifyEmail, setVerifyEmail] = useState(null);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [delDeviceId, setDelDeviceId] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setStateLogin({
      ...stateLogin
    })
    setIsLoading(true);

    // call login alpha
    compareService.postLoginAlpha(stateLogin.username, stateLogin.password, locale).then((res) => {
      localStorage.setItem('userAlpha', JSON.stringify(res.data));
      localStorage.setItem('isLoggedIn', true)
      setIsLoading(false);
    }).catch((err) => {
      if (err.response) {
        localStorage.setItem('userAlpha', JSON.stringify(err.response.data));
        localStorage.setItem('isLoggedIn', false)
        setIsLoading(false);
      }
    });

    // call login beta
    compareService.postLoginBeta(stateLogin.username, stateLogin.password, locale).then((res) => {
      localStorage.setItem('userBeta', JSON.stringify(res.data));
      setPutUserMe({ locale: res.data.data.user.locale, isAdultFilterOn: res.data.data.user.isAdultFilterOn, birthDate: res.data.data.user.birthDate, gender: res.data.data.user.gender, agreements: { marketingEmail: res.data.data.user.agreements.marketingEmail, collectingBirth: res.data.data.user.agreements.collectingBirth } });
    }).catch((err) => {
      if (err.response) {
        localStorage.setItem('userBeta', JSON.stringify(err.response.data));
        localStorage.setItem('isLoggedIn', false);
      }
    });

    // call login cms alpha
    compareService.postLoginCmsAlpha().then((res) => {
      localStorage.setItem('adminAlpha', JSON.stringify(res.data));
      localStorage.setItem('isLoggedIn', true)
    }).catch((err) => {
      if (err.response) {
        localStorage.setItem('adminAlpha', JSON.stringify(err.response.data));
      }
    });

    // call login cms beta
    compareService.postLoginCmsBeta().then((res) => {
      localStorage.setItem('adminBeta', JSON.stringify(res.data));
    }).catch((err) => {
      if (err.response) {
        localStorage.setItem('adminBeta', JSON.stringify(err.response.data));
      }
    });
  }

  // ==================================================== handle call api ====================================================
  // ==================================================== handle call api ====================================================

  const handleStart = (e) => {
    e.preventDefault();

    if (isLoggedIn) {

      setIsLoadingBeta(true);
      setIsLoadingAlpha(true);
      setIsLoading(true);

      // call get users/me/meta alpha
      compareService.getUserMeMetaAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeMetaAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeMetaAlpha', JSON.stringify(err.response.data));
      })

      // call get users/me alpha
      compareService.getUserMeAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeAlpha', JSON.stringify(err.response.data));
      })

      // call get users/me/meta alpha
      compareService.getUserMeMetaV1Alpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeMetaV1Alpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeMetaV1Alpha', JSON.stringify(err.response.data));
      })

      // call get users/me alpha
      compareService.getUserMeV1Alpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeV1Alpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeV1Alpha', JSON.stringify(err.response.data));
      })

      // call get users/me/cohort alpha
      compareService.getUserMeCohortAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeCohortAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeCohortApha', JSON.stringify(err.response.data));
      })

      // call get users/me/devices alpha
      compareService.getUserMeDevicesAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeDevicesAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeDevicesBeta', err.response.data);
      })

      // call get users/me/certifications alpha
      compareService.getUserMeCertificationsAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeCertificationsAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeCertificationsAlpha', JSON.stringify(err.response.data));
      })

      // call get users/me/identity alpha
      compareService.getUserIdentityAlpha(userAlpha.data.access_token, locale).then((res) => {
        localStorage.setItem('userIdentityAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userIdentityAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/connections/Social alpha
      compareService.getUserMeConnectionsSocialAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, socialType, locale).then((res) => {
        localStorage.setItem('userMeConnectionsSocialAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeConnectionsSocialAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/genres alpha
      compareService.getUserMeGenresAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeGenresAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeGenresAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/balance alpha
      compareService.getUserMeBalanceAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeBalanceAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeBalanceAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/ga alpha
      compareService.getUserMeGAAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeGaAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeGaAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/BadgeCount alpha
      compareService.getUserMeBadgeCountAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/BadgeCount alpha
      compareService.getUserMeBadgeCountAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/presents?offset=0&limit=50 alpha
      compareService.getUserMePresentsAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMePresentsAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMePresentsAlpha', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/subscription?limit=30&offset=0&sort=createdAt&filter=all alpha
      compareService.getUserMeSubscriptionAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeSubscriptionAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeSubscriptionAlpha', JSON.stringify(err.response.data));
      })

      // call get /users/{{me}/invitations?page=0&limit=10 alpha
      compareService.getUserMeInvitationsAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeInvitationsAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeInvitationsAlpha', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/library/filters alpha
      compareService.getUserMeLibraryAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeLibraryAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeLibraryAlpha', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/dailyfree/recent Alpha
      compareService.getUserMeDailyFreeAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeDailyFreeAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeDailyFreeAlpha', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/recents Alpha
      compareService.getUserMeRecentsAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeRecentsAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeRecentsAlpha', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/Charges Alpha
      compareService.getUserMeChargesAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeChargesAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeChargesAlpha', JSON.stringify(err.response.data));
      })

      // call get search user Alpha
      compareService.getUserCmsSearchUserAlpha(adminAlpha.access_token, usernameSearch).then((res) => {
        localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(err.response.data));
      })

      // ============================== ============================== put API ============================== ==============================
      // ============================== ============================== put API ============================== ==============================

      // call put users/{me}/connect/{socialType} alpha

      compareService.putUserMeSocialAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, putUserSocial, socialTypePut, locale).then((res) => {
        localStorage.setItem('putUserMeSocialAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeSocialAlpha', JSON.stringify(err.response.data));
      })

      // call put users/{me} alpha

      compareService.putUserMeAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, putUserMe, locale).then((res) => {
        localStorage.setItem('putUserMeAlpha', JSON.stringify(res.data));
        setIsLoadingAlpha(false);
        setIsLoading(false);
        setIsLoadingBeta(false);
      }).catch((err) => {
        setIsLoadingAlpha(false);
        setIsLoading(false);
        setIsLoadingBeta(false);
        localStorage.setItem('putUserMeAlpha', JSON.stringify(err.response.data));
      })

      // ============================== ============================== del API ============================== ==============================
      // ============================== ============================== del API ============================== ==============================



      // ==================================================== beta ======================================================================================
      // ==================================================== beta ======================================================================================


      // call get users/me beta
      compareService.getUserMeBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeBeta', JSON.stringify(err.response.data));
      })

      // call get users/me/meta beta
      compareService.getUserMeMetaBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeMetaBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeMetaBeta', JSON.stringify(err.response.data));
      })

      // call get users/me/cohort Beta
      compareService.getUserMeCohortBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeCohortBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeCohortBeta', JSON.stringify(err.response.data));
      })

      // call get users/me/Devices Beta
      compareService.getUserMeDevicesBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeDevicesBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeDevicesBeta', JSON.stringify(err.response.data));
      })

      // call get users/me/certifications Beta
      compareService.getUserMeCertificationsBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeCertificationsBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeCertificationsBeta', JSON.stringify(err.response.data));
      })

      // call get users/me/identity Beta
      compareService.getUserIdentityBeta(userBeta.data.access_token, locale).then((res) => {
        localStorage.setItem('userIdentityBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userIdentityBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/connections/Social Beta
      compareService.getUserMeConnectionsSocialBeta(userBeta.data.access_token, userBeta.data.user.userId, socialType, locale).then((res) => {
        localStorage.setItem('userMeConnectionsSocialBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeConnectionsSocialBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/genres Beta
      compareService.getUserMeGenresBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeGenresBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeGenresBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/balance Beta
      compareService.getUserMeBalanceBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeBalanceBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeBalanceBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/ga Beta
      compareService.getUserMeGABeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeGaBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeGaBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/BadgeCount Beta
      compareService.getUserMeBadgeCountBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeBadgeCountBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeBadgeCountBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/presents?offset=0&limit=50 Beta
      compareService.getUserMePresentsBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMePresentsBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMePresentsBeta', JSON.stringify(err.response.data));
      })

      // call get v2/users/{{me}/subscription?limit=30&offset=0&sort=createdAt&filter=all Beta
      compareService.getUserMeSubscriptionBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeSubscriptionBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeSubscriptionBeta', JSON.stringify(err.response.data));
      })

      // call get /users/{{me}/invitations?page=0&limit=10 Beta
      compareService.getUserMeInvitationsBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeInvitationsBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeInvitationsBeta', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/library/filters Beta
      compareService.getUserMeLibraryBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeLibraryBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeLibraryBeta', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/dailyfree/recent Beta
      compareService.getUserMeDailyFreeBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeDailyFreeBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeDailyFreeBeta', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/recents Beta
      compareService.getUserMeRecentsBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeRecentsBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeRecentsBeta', JSON.stringify(err.response.data));
      })

      // call get /v2/users/{{me}/Charges Beta
      compareService.getUserMeChargesBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeChargesBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeChargesBeta', JSON.stringify(err.response.data));
      })

      // call get users/me/meta Beta
      compareService.getUserMeMetaV1Beta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeMetaV1Beta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeMetaV1Beta', JSON.stringify(err.response.data));
      })

      // call get users/me Beta
      compareService.getUserMeV1Beta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeV1Beta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeV1Beta', JSON.stringify(err.response.data));
      })

      // call post v2/get/{me}/Search cms Beta

      compareService.getUserCmsSearchUserBeta(adminBeta.access_token, usernameSearch).then((res) => {
        localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(err.response.data));
      })

      // ============================== ============================== put API ============================== ==============================
      // ============================== ============================== put API ============================== ==============================

      // call put users/{me} Beta
      compareService.putUserMeBeta(userBeta.data.access_token, userBeta.data.user.userId, putUserMe, locale).then((res) => {
        localStorage.setItem('putUserMeBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeBeta', JSON.stringify(err.response.data));
      })

      // call put users/{me}/connection/{social-type} Beta

      compareService.putUserMeSocialBeta(userBeta.data.access_token, userBeta.data.user.userId, putUserSocial, socialTypePut, locale).then((res) => {
        localStorage.setItem('putUserMeSocialBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeSocialBeta', JSON.stringify(err.response.data));
      })

      // ============================== ============================== del API ============================== ==============================
      // ============================== ============================== del API ============================== ==============================

      //

    }
  }

  // get Local Storage Data ===========================================================================================================================
  // get Local Storage Data ===========================================================================================================================

  const adminBeta = JSON.parse(localStorage.getItem('adminBeta'));
  const postUserCmsUnregisterBeta = JSON.parse(localStorage.getItem('postUserCmsUnregisterBeta'));
  const postUserCmsReregisterBeta = JSON.parse(localStorage.getItem('postUserCmsReregisterBeta'));
  const userBeta = JSON.parse(localStorage.getItem('userBeta'));
  const userMeMetaBeta = JSON.parse(localStorage.getItem('userMeMetaBeta'));
  const userMeBeta = JSON.parse(localStorage.getItem('userMeBeta'));
  const userMeMetaV1Beta = JSON.parse(localStorage.getItem('userMeMetaV1Beta'));
  const userMeV1Beta = JSON.parse(localStorage.getItem('userMeV1Beta'));
  const userMeCohortBeta = JSON.parse(localStorage.getItem('userMeCohortBeta'));
  const userMeDevicesBeta = JSON.parse(localStorage.getItem('userMeDevicesBeta'));
  const userMeCertificationsBeta = JSON.parse(localStorage.getItem('userMeCertificationsBeta'));
  const userIdentityBeta = JSON.parse(localStorage.getItem('userIdentityBeta'));
  const userMeConnectionsSocialBeta = JSON.parse(localStorage.getItem('userMeConnectionsSocialBeta'));
  const userMeGenresBeta = JSON.parse(localStorage.getItem('userMeGenresBeta'));
  const userMeBalanceBeta = JSON.parse(localStorage.getItem('userMeBalanceBeta'));
  const userMeGaBeta = JSON.parse(localStorage.getItem('userMeGaBeta'));
  const userMeBadgeCountBeta = JSON.parse(localStorage.getItem('userMeBadgeCountBeta'));
  const userMePresentsBeta = JSON.parse(localStorage.getItem('userMePresentsBeta'));
  const userMeSubscriptionBeta = JSON.parse(localStorage.getItem('userMeSubscriptionBeta'));
  const userMeInvitationsBeta = JSON.parse(localStorage.getItem('userMeInvitationsBeta'));
  const userMeLibraryBeta = JSON.parse(localStorage.getItem('userMeLibraryBeta'));
  const userMeDailyFreeBeta = JSON.parse(localStorage.getItem('userMeDailyFreeBeta'));
  const userMeRecentsBeta = JSON.parse(localStorage.getItem('userMeRecentsBeta'));
  const userMeChargesBeta = JSON.parse(localStorage.getItem('userMeChargesBeta'));
  const getUserCmsSearchBeta = JSON.parse(localStorage.getItem('getUserCmsSearchBeta'));
  const putUserMeBeta = JSON.parse(localStorage.getItem('putUserMeBeta'));
  const putUserMePasswordBeta = JSON.parse(localStorage.getItem('putUserMePasswordBeta'));
  const putUserMeUsernameBeta = JSON.parse(localStorage.getItem('putUserMeUsernameBeta'));
  const putUserMeSocialBeta = JSON.parse(localStorage.getItem('putUserMeSocialBeta'));
  const putUserMeUnregisterBeta = JSON.parse(localStorage.getItem('putUserMeUnregisterBeta'));
  const delUserMeSocialBeta = JSON.parse(localStorage.getItem('delUserMeSocialBeta'));
  const postVerificationSendEmailBeta = JSON.parse(localStorage.getItem('postVerificationSendEmailBeta'));
  const putVerificationsBeta = JSON.parse(localStorage.getItem('putVerificationsBeta'));
  const postUserSignupBeta = JSON.parse(localStorage.getItem('postUserSignupBeta'));
  const delUserByeBeta = JSON.parse(localStorage.getItem('delUserByeBeta'));
  const delUserDevicesAllBeta = JSON.parse(localStorage.getItem('delUserDevicesAllBeta'));
  const delUserDevicesByIdBeta = JSON.parse(localStorage.getItem('delUserDevicesByIdBeta'));

  // ------------------------

  const adminAlpha = JSON.parse(localStorage.getItem('adminAlpha'));
  const postUserCmsUnregisterAlpha = JSON.parse(localStorage.getItem('postUserCmsUnregisterAlpha'));
  const postUserCmsReregisterAlpha = JSON.parse(localStorage.getItem('postUserCmsReregisterAlpha'));
  const userAlpha = JSON.parse(localStorage.getItem('userAlpha'));
  const userMeMetaAlpha = JSON.parse(localStorage.getItem('userMeMetaAlpha'));
  const userMeAlpha = JSON.parse(localStorage.getItem('userMeAlpha'));
  const userMeMetaV1Alpha = JSON.parse(localStorage.getItem('userMeMetaV1Alpha'));
  const userMeV1Alpha = JSON.parse(localStorage.getItem('userMeV1Alpha'));
  const userMeCohortAlpha = JSON.parse(localStorage.getItem('userMeCohortAlpha'));
  const userMeDevicesAlpha = JSON.parse(localStorage.getItem('userMeDevicesAlpha'));
  const userMeCertificationsAlpha = JSON.parse(localStorage.getItem('userMeCertificationsAlpha'));
  const userIdentityAlpha = JSON.parse(localStorage.getItem('userIdentityAlpha'));
  const userMeConnectionsSocialAlpha = JSON.parse(localStorage.getItem('userMeConnectionsSocialAlpha'));
  const userMeGenresAlpha = JSON.parse(localStorage.getItem('userMeGenresAlpha'));
  const userMeBalanceAlpha = JSON.parse(localStorage.getItem('userMeBalanceAlpha'));
  const userMeGaAlpha = JSON.parse(localStorage.getItem('userMeGaAlpha'));
  const userMeBadgeCountAlpha = JSON.parse(localStorage.getItem('userMeBadgeCountAlpha'));
  const userMePresentsAlpha = JSON.parse(localStorage.getItem('userMePresentsAlpha'));
  const userMeSubscriptionAlpha = JSON.parse(localStorage.getItem('userMeSubscriptionAlpha'));
  const userMeInvitationsAlpha = JSON.parse(localStorage.getItem('userMeInvitationsAlpha'));
  const userMeLibraryAlpha = JSON.parse(localStorage.getItem('userMeLibraryAlpha'));
  const userMeDailyFreeAlpha = JSON.parse(localStorage.getItem('userMeDailyFreeAlpha'));
  const userMeRecentsAlpha = JSON.parse(localStorage.getItem('userMeRecentsAlpha'));
  const userMeChargesAlpha = JSON.parse(localStorage.getItem('userMeChargesAlpha'));
  const getUserCmsSearchAlpha = JSON.parse(localStorage.getItem('getUserCmsSearchAlpha'));
  const putUserMeAlpha = JSON.parse(localStorage.getItem('putUserMeAlpha'));
  const putUserMePassowrdAlpha = JSON.parse(localStorage.getItem('putUserMePasswordAlpha'));
  const putUserMeUsernameAlpha = JSON.parse(localStorage.getItem('putUserMeUsernameAlpha'));
  const putUserMeSocialAlpha = JSON.parse(localStorage.getItem('putUserMeSocialAlpha'));
  const putUserMeUnregisterAlpha = JSON.parse(localStorage.getItem('putUserMeUnregisterAlpha'));
  const delUserMeSocialAlpha = JSON.parse(localStorage.getItem('delUserMeSocialAlpha'));
  const postVerificationSendEmailAlpha = JSON.parse(localStorage.getItem('postVerificationSendEmailAlpha'));
  const putVerificationsAlpha = JSON.parse(localStorage.getItem('putVerificationsAlpha'));
  const postUserSignupAlpha = JSON.parse(localStorage.getItem('postUserSignupAlpha'));
  const delUserByeAlpha = JSON.parse(localStorage.getItem('delUserByeAlpha'));
  const delUserDevicesAllAlpha = JSON.parse(localStorage.getItem('delUserDevicesAllAlpha'));
  const delUserDevicesByIdAlpha = JSON.parse(localStorage.getItem('delUserDevicesByIdAlpha'));

  const verificationEmail = localStorage.getItem('verificationEmail');
  // handle request ===================================================================================================================================
  // handle request ===================================================================================================================================

  const isLoggedIn = localStorage.getItem('isLoggedIn') || false;

  const handleReload = () => {
    localStorage.clear();
    window.location.reload();
  }

  const clickView = () => {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (!isAutoPut && userAlpha && userBeta) {
        if (!userAlpha.error || !userBeta.error) {
          setPutUserMe({ locale: userAlpha.data.user.locale, isAdultFilterOn: userAlpha.data.user.isAdultFilterOn, birthDate: userAlpha.data.user.birthDate, gender: userAlpha.data.user.gender, agreements: { marketingEmail: userAlpha.data.user.agreements.marketingEmail, collectingBirth: userAlpha.data.user.agreements.collectingBirth, timer: userAlpha.data.user.agreements.timer, subscription: userAlpha.data.user.agreements.subscription } });
          setPutUserPassword({ password: null, newPassword: null });
          setPutUserUsername({ username: userAlpha.data.user.username, password: 'lezhin123!' });
          setPutUserSocial({ accessToken: null });
        }
      } else if (!isAutoPost) {
        setPutUnregister(null);
      }
    }
  }, [isLoggedIn]);

  const handlePutChangeValue1 = (e, t) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let data;

    switch (t) {
      case 1:
        data = { ...putUserMe };
        data[name] = value;
        setPutUserMe(data);
        break;
      case 2:
        data = { ...putUserPassword };
        data[name] = value;
        setPutUserPassword(data);
        break;
      case 3:
        data = { ...putUserUsername };
        data[name] = value;
        setPutUserUsername(data);
        break;
      case 4:
        data = { ...putUserSocial };
        data[name] = value;
        break;
      case 5:
        data = { ...putUnregister };
        data[name] = value;
        break;
      case 6:
        setUsernameSearch(value);
        break;
      case 7:
        localStorage.setItem('verificationEmail', value);
        setVerifyEmail(value);
        break;
      case 8:
        data = { ...putVerificationsDataAlpha };
        data.email = verificationEmail;
        postSignupAlpha.account.username = verificationEmail;
        postSignupBeta.account.username = verificationEmail;
        postSignupAlpha.verificationToken = value;
        data[name] = value;
        setPutVerificationsDataAlpha(data);
        break;
      case 9:
        data = { ...postSignupAlpha };
        data[name] = value;
        setPostSignupApha(data);
        setPostSignupBeta(data);
        break;
      case 10:
        data = { ...putVerificationsDataBeta };
        data.email = verificationEmail;
        postSignupBeta.verificationToken = value;
        data[name] = value;
        setPutVerificationsDataBeta(data);
        break;
      case 11:
        setDelDeviceId(value);
      default:
        break;
    }
  }

  const handlePutChangeValue2 = (e, t) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let data;
    let data1;
    let value1;

    switch (t) {
      case 1:
        data = { ...putUserMe };
        if (value == 'false') { value1 = false } else if (value1 == 'true') { value = true } else { value1 = true }
        data.agreements[name] = value1;
        setPutUserMe(data);
        break;
      case 2:
        data = { ...postSignupAlpha };
        if (value == 'false') { value1 = false } else if (value1 == 'true') { value = true } else { value1 = true }
        data.agreements[name] = value1;
        setPostSignupApha(data);
        setPostSignupBeta(data);
        break;
      case 3:
        data = { ...postSignupAlpha };
        data1 = { ...postSignupBeta };
        data.account[name] = value;
        data1.account[name] = value;
        setPostSignupApha(data);
        setPostSignupBeta(data1);
        break;
      default:
        break;
    }
  }

  const handleSelectSocialType = (e, t) => {
    switch (t) {
      case 1:
        setSocialType(e.target.value);
        break;
      case 2:
        setSocialTypePut(e.target.value);
        break;
      default:
        setSocialTypeDel(e.target.value);
        break;
    }
  }

  const handleSelectLocale = (e) => {
    setLocale(e.target.value);
  }

  const handleSelectAuto = (e, t) => {
    switch (t) {
      case 1:
        if (e.target.value == 'false') {
          setIsAutoPut(false);
          if (isLoggedIn) {
            setPutUserMe({ locale: userAlpha.data.user.locale, isAdultFilterOn: userAlpha.data.user.isAdultFilterOn, birthDate: userAlpha.data.user.birthDate, gender: userAlpha.data.user.gender, agreements: { marketingEmail: userAlpha.data.user.agreements.marketingEmail, collectingBirth: userAlpha.data.user.agreements.collectingBirth, timer: userAlpha.data.user.agreements.timer, subscription: userAlpha.data.user.agreements.subscription } });
            setPutUserPassword({ password: null, newPassword: null });
            setPutUserUsername({ username: userAlpha.data.user.username, password: 'lezhin123!' });
            setPutUserSocial({ accessToken: null });
          }
        } else {
          setIsAutoPut(true);
          setPutUserMe({ locale: "ko-KR", isAdultFilterOn: true, birthDate: "19990304", gender: "male", agreements: { marketingEmail: true, collectingBirth: true, timer: true, subscription: true } });
          setPutUserUsername({ username: userAlpha ? userAlpha.data.user.username : null, password: 'lezhin123!' });
          setPutUserPassword({ password: 'lezhin123!', newPassword: 'lezhin123!' });
          setPutUserSocial({ accessToken: 'EAAK4nWXU8zgBAPGjurSpIiakdFv2UAGfGpjxXGdqMgeT7dqscJmVWZAkZBwjaQCHGVuzpyNhni0Mt4JnOiCZBFqKnZAFvkn6OQIDqO9u0jZAmXm7GEjtqclyyCdQ8JZBFtaL30zs02CGOMxCMkpe5NPOHYFod19JxdrVtS6lo53OhFO8uOwo2fX2u0m7JU6RD7H79IHRZBRk66p31axknK36FtQBk0BhmO7wDmcciFMZCD6vewP4f8ZBq' });
        }
        break;
      case 2:
        if (e.target.value == 'false') {
          setIsAutoPost(false);
          setPutUnregister(null);
          setUsernameSearch(null);
        } else {
          setIsAutoPost(true);
          setPutUnregister({ password: 'lezhin123!', reason: 'test', kind: '123', selected: '123', cause: '23' });
          setUsernameSearch('dungnguyent9902@gmail.com');
        }
        break;
      case 3:
        if (e.target.value == 'false') {
          setIsAutoDel(false);
        } else {
          setIsAutoDel(true);
        }
        break;
      default:
        break;
    }
  }

  const handClickRequest = (e, t) => {
    if (userAlpha && userBeta) {
      switch (t) {
        case 1:
          // call post users/{me}/unregister alpha
          setIsLoadingRequest(true);
          compareService.putUserMeUnregisterAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, putUnregister, locale).then((res) => {
            localStorage.setItem('putUserMeUnregisterAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('putUserMeUnregisterAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          // call post users/{me}/unregister Beta

          compareService.putUserMeUnregisterBeta(userBeta.data.access_token, userBeta.data.user.userId, putUnregister, locale).then((res) => {
            localStorage.setItem('putUserMeUnregisterBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('putUserMeUnregisterBeta', JSON.stringify(err.response.data));
          });

          break;
        case 2:
          // call post v2/users/{me}/unregister cms alpha
          setIsLoadingRequest(true);
          compareService.postUserCmsUnregisterAlpha(adminAlpha.access_token, userAlpha.data.user.userId, null).then((res) => {
            localStorage.setItem('postUserCmsUnregisterAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('postUserCmsUnregisterAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          // call post v2/users/{me}/unregister cms Beta

          compareService.postUserCmsUnregisterBeta(adminBeta.access_token, userBeta.data.user.userId, null).then((res) => {
            localStorage.setItem('postUserCmsUnregisterBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('postUserCmsUnregisterBeta', JSON.stringify(err.response.data));
          });

          break;
        case 3:

          // call post v2/users/{me}/Reregister cms alpha
          setIsLoadingRequest(true);
          compareService.postUserCmsReregisterAlpha(adminAlpha.access_token, userAlpha.data.user.userId, null).then((res) => {
            localStorage.setItem('postUserCmsReregisterAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('postUserCmsReregisterAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          // call post v2/users/{me}/Reregister cms Beta

          compareService.postUserCmsReregisterBeta(adminBeta.access_token, userBeta.data.user.userId, null).then((res) => {
            localStorage.setItem('postUserCmsReregisterBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('postUserCmsReregisterBeta', JSON.stringify(err.response.data));
          });
          break;
        case 4:

          // call post v2/get/{me}/Search cms alpha
          setIsLoadingRequest(true);
          compareService.getUserCmsSearchUserAlpha(adminAlpha.access_token, usernameSearch).then((res) => {
            localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          // call post v2/get/{me}/Search cms Beta

          compareService.getUserCmsSearchUserBeta(adminBeta.access_token, usernameSearch).then((res) => {
            localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(err.response.data));
          });
          break;
        case 5:
          // send verification email
          setIsLoadingRequest(true);
          compareService.postVerificationSendEmailAlpha(verifyEmail).then((res) => {
            localStorage.setItem('postVerificationSendEmailAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('postVerificationSendEmailAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          compareService.postVerificationSendEmailBeta(verifyEmail).then((res) => {
            localStorage.setItem('postVerificationSendEmailBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('postVerificationSendEmailBeta', JSON.stringify(err.response.data));
          });

          break;
        case 6:
          // entry verification code
          setIsLoadingRequest(true);
          compareService.putVerificationsAlpha(putVerificationsDataAlpha).then((res) => {
            localStorage.setItem('putVerificationsAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('putVerificationsAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          compareService.putVerificationsBeta(putVerificationsDataBeta).then((res) => {
            localStorage.setItem('putVerificationsBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('putVerificationsBeta', JSON.stringify(err.response.data));
          });

          break;
        case 7:
          // send post sign up user
          setIsLoadingRequest(true);
          compareService.postUserSignupAlpha(postSignupAlpha, locale).then((res) => {
            localStorage.setItem('postUserSignupAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('postUserSignupAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          compareService.postUserSignupBeta(postSignupBeta, locale).then((res) => {
            localStorage.setItem('postUserSignupBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('postUserSignupBeta', JSON.stringify(err.response.data));
          });

          break;
        case 8:
          // send del user bye
          setIsLoadingRequest(true);
          compareService.delUserByeAlpha(userAlpha.data.access_token).then((res) => {
            localStorage.setItem('delUserByeAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('delUserByeAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          compareService.delUserByeBeta(userBeta.data.access_token).then((res) => {
            localStorage.setItem('delUserByeBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('delUserByeBeta', JSON.stringify(err.response.data));
          });

          break;
        case 9:
          // send del user devices all
          setIsLoadingRequest(true);
          compareService.delUserDevicesAllAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
            localStorage.setItem('delUserDevicesAllAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('delUserDevicesAllAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          compareService.delUserDevicesAllBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
            localStorage.setItem('delUserDevicesAllBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('delUserDevicesAllBeta', JSON.stringify(err.response.data));
          });
          break;
        case 10:
          // call del users/{me}/connect/{socialType} alpha
          setIsLoadingRequest(true);
          compareService.delUserMeSocialAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, delUserSocial, socialTypeDel, locale).then((res) => {
            localStorage.setItem('delUserMeSocialAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('delUserMeSocialAlpha', JSON.stringify(err.response.data));
          });

          compareService.delUserMeSocialBeta(userBeta.data.access_token, userBeta.data.user.userId, delUserSocial, socialTypeDel, locale).then((res) => {
            localStorage.setItem('delUserMeSocialBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('delUserMeSocialBeta', JSON.stringify(err.response.data));
          });
          break;
        case 11:
          // send del user devices ById
          setIsLoadingRequest(true);
          compareService.delUserDevicesByIdAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
            localStorage.setItem('delUserDevicesByIdAlpha', JSON.stringify(res.data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            localStorage.setItem('delUserDevicesByIdAlpha', JSON.stringify(err.response.data));
            setIsLoadingRequest(false);
          });

          compareService.delUserDevicesByIdBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
            localStorage.setItem('delUserDevicesByIdBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('delUserDevicesByIdBeta', JSON.stringify(err.response.data));
          });
          break;
        case 12:
          setIsLoadingRequest(true);
          // call put users/{me}/password Beta

          compareService.putUserMePasswordBeta(userBeta.data.access_token, userBeta.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
            localStorage.setItem('putUserMePasswordBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('putUserMePasswordBeta', JSON.stringify(err.response.data));
          })

          // call put users/{me}/password alpha

          compareService.putUserMePasswordAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
            localStorage.setItem('putUserMePasswordAlpha', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('putUserMePasswordAlpha', JSON.stringify(err.response.data));
          })
          break;
        case 13:
          setIsLoadingRequest(true);
          // call put users/{me}/username Beta

          compareService.putUserMeUsernameBeta(userBeta.data.access_token, userBeta.data.user.userId, { username: putUserUsername.username, password: putUserUsername.password }, locale).then((res) => {
            localStorage.setItem('putUserMeUsernameBeta', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('putUserMeUsernameBeta', JSON.stringify(err.response.data));
          })

          // call put users/{me}/username alpha

          compareService.putUserMeUsernameAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, { username: putUserUsername.username, password: putUserUsername.password }, locale).then((res) => {
            localStorage.setItem('putUserMeUsernameAlpha', JSON.stringify(res.data));
          }).catch((err) => {
            localStorage.setItem('putUserMeUsernameAlpha', JSON.stringify(err.response.data));
          })
          break;
        default:
          break;
      }
    }
  }

  // return ===========================================================================================================================
  // return ===========================================================================================================================

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-4 ms-4 me-4 ps-4 pe-4 mt-4'>
            {!userAlpha || !userBeta ?
              (
                <>
                  <form onSubmit={(e) => handleLogin(e)}>
                    <div className="form-group from-outline mb-2 mt-3">
                      <label htmlFor="username" className='text-secondary' style={{ fontSize: ".9rem" }}>Email</label>
                      <input
                        type="email"
                        style={{ fontSize: ".9rem" }}
                        className="form-control"
                        name="username"
                        aria-label="Search"
                        value={stateLogin.username}
                        onChange={(e) => setStateLogin({
                          ...stateLogin,
                          username: e.target.value,
                        })}
                      />
                    </div>

                    <div className="form-group from-outline mb-2">
                      <label htmlFor="password" className='text-secondary' style={{ fontSize: ".9rem" }}>Password</label>
                      <input
                        type="password"
                        style={{ fontSize: ".9rem" }}
                        className="form-control"
                        aria-label="Search"
                        name="password"
                        value={stateLogin.password}
                        onChange={(e) => setStateLogin({
                          ...stateLogin,
                          password: e.target.value,
                        })}
                      />
                    </div>

                    <div className="form-group pt-3 text-center">
                      <button
                        className="btn btn-danger btn-block mb"
                        style={{ padding: "5px 30px", fontSize: ".86rem" }}
                        disabled={isLoading}
                      >
                        <span>{isLoading ? <> <span>Pending</span> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> </> : <><span>Login lezhin account</span></>}</span>
                      </button>
                    </div>
                  </form>
                </>
              )
              :
              (
                <>
                  <div className='ms-4 mt-5 text-center' style={{ fontSize: 13 }}>
                    <span className="title">- Alpha:</span> {userAlpha.data && !userAlpha.error ? userAlpha.data.user.username : (<>not found</>)} - {userAlpha.data && !userAlpha.error ? userAlpha.data.user.userId : (<>not found</>)}
                    <br /> <span className="title">- Beta :</span> {userBeta.data && !userBeta.error ? userBeta.data.user.username : (<>not found</>)} - {userBeta.data && !userBeta.error ? userBeta.data.user.userId : <>not found</>}
                    <br />
                    <button
                      className="btn btn-primary btn-block mb-4 mt-3"
                      style={{ padding: "5px 30px" }}
                      onClick={handleReload}
                    >
                      <span style={{ fontSize: 13 }}>Try other user</span>
                    </button>
                  </div>
                </>
              )}
          </div>
          <div className='col-7 text-center text-danger h1 pt-5 mt-5' style={{ backgroundImage: `url(https://image.slidesdocs.com/responsive-images/background/white-clean-abstract-portfolio-simple-powerpoint-background_a97a4601d6__960_540.jpg)`, backgroundRepeat: "no-repeat", backgroundSize: "auto" }}>
            <div className="mainText">
              <div className="box">

                <div className="title">
                  <span className="block"></span>
                  <h1>Lezhin Comic<span></span></h1>
                </div>

                <div className="role">
                  <div className="block"></div>
                  <p className='ps-5'>API Comparator</p>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='container-fluid'>
        <div className='row'>
          {/* sticky */}

          <div className='col-2 d-none d-lg-block'>
            <div className='sticky-addition' style={{ paddingTop: 2 }}>
              <div className='bg-light ms-4' style={{ width: "fit-content", paddingLeft: 30, marginTop: 38, paddingBottom: 20, paddingTop: 10, paddingRight: 30, fontSize: ".74rem", borderRadius: 10 }}>
                <div className='text-center text-danger'> OPTION </div>
                <br />
                {/* socialType */}

                <div className='mb-2 fw-bold'> BASE Condition</div>

                Locale &#160;
                <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='socialTypeBase' value={locale} onChange={handleSelectLocale}
                >
                  <option value="ko-KR">ko-KR</option>
                  <option value="en-US">en-US</option>
                  <option value="ja-JP">ja-JP</option>

                </select>

                {/* socialType */}

                <div className='mb-2 mt-3 fw-bold text-success'> GET Condition</div>

                Social-type &#160;
                <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='socialTypeGet' value={socialType} onChange={(e) => handleSelectSocialType(e, 1)}
                >
                  <option value="facebook">facebook</option>
                  <option value="naver">naver</option>
                  <option value="twitter">twitter</option>
                  <option value="google">google</option>
                  <option value="apple">apple</option>
                  <option value="yahoojapan">yahoojapan</option>
                  <option value="line">line</option>
                  <option value="kakao">kakao</option>
                </select>

                {/* socialType */}

                <div className='mb-2 mt-3 fw-bold text-primary'> PUT Condition</div>

                Auto fill PUT&#160;
                <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='autoFillPut' value={isAutoPut} onChange={(e) => handleSelectAuto(e, 1)}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                <br />

                Social-type &#160;
                <select className="form-select-sm mt-2" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='socialTypePut' value={socialTypePut} onChange={(e) => handleSelectSocialType(e, 2)}
                >
                  <option value="facebook">facebook</option>
                  <option value="naver">naver</option>
                  <option value="twitter">twitter</option>
                  <option value="google">google</option>
                  <option value="apple">apple</option>
                  <option value="yahoojapan">yahoojapan</option>
                  <option value="line">line</option>
                  <option value="kakao">kakao</option>
                </select>


                {/* socialType */}

                <div className='mb-2 mt-3 fw-bold text-warning'> POST Condition</div>

                Auto fill POST&#160;
                <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='socialTypePost' value={isAutoPost} onChange={(e) => handleSelectAuto(e, 2)}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                <br></br>

                {/* socialType */}

                <div className='mb-2 mt-3 fw-bold text-danger'> DEL Condition</div>

                Auto fill DEL&#160;
                <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='autoDel' value={isAutoDel} onChange={(e) => handleSelectAuto(e, 3)}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>

                <br />

                Social-type &#160;
                <select className="form-select-sm mt-2" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='socialTypeDel' value={socialTypeDel} onChange={(e) => handleSelectSocialType(e, 3)}
                >
                  <option value="facebook">facebook</option>
                  <option value="naver">naver</option>
                  <option value="twitter">twitter</option>
                  <option value="google">google</option>
                  <option value="apple">apple</option>
                  <option value="yahoojapan">yahoojapan</option>
                  <option value="line">line</option>
                  <option value="kakao">kakao</option>
                </select>

                <br></br>

                <div className='mb-2 mt-4 fw-bold text-danger text-center'> <button className='btn btn-info' disabled={!isLoggedIn} onClick={(e) => handleStart(e)} style={{ fontSize: ".86rem" }}> {!isLoading ? 'START TESTING' : <> <span>Pending</span> <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span> </>}  </button> </div>

                {isLoggedIn ? '' : <div className='mb-2 fw-bold text-danger text-center'> You must login before <br /> start testing </div>}

                {/* socialType */}

              </div>
            </div>
          </div>

          <div className='col-8'>
            <hr></hr>

            {/* API get user me */}
            <span id='wrapper_get_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'} </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            {!isLoadingAlpha ?
              <><JsonCompare oldData={userMeBeta} newData={userMeAlpha} /></> : (<><div className='text-center'><img src='https://www.ucreative.com/wp-content/uploads/2014/09/fusion.gif' height={390} /> <br />
                <div className='waviy'>
                  <span style={{ '--i': 1 }}>M</span>
                  <span style={{ '--i': 2 }}>e</span>
                  <span style={{ '--i': 3 }}>r</span>
                  <span style={{ '--i': 4 }}>g</span>
                  <span style={{ '--i': 5 }}>i</span>
                  <span style={{ '--i': 6 }}>n</span>
                  <span style={{ '--i': 7 }}>g</span>
                  &#160;
                  <span style={{ '--i': 8 }}>D</span>
                  <span style={{ '--i': 9 }}>a</span>
                  <span style={{ '--i': 10 }}>t</span>
                  <span style={{ '--i': 11 }}>a</span>
                  <span style={{ '--i': 12 }}>.</span>
                  <span style={{ '--i': 13 }}>.</span>
                  <span style={{ '--i': 14 }}>.</span>
                </div>
              </div>
              </>)}

            {/* API get user me meta */}
            <hr id='wrapper_get_2' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/meta </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeMetaBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeMetaAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeMetaBeta} newData={userMeMetaAlpha} />

            {/* API get user me cohort */}
            <hr id='wrapper_get_3' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/cohort </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeCohortBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeCohortAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeCohortBeta} newData={userMeCohortAlpha} />

            {/* API get user me presents */}
            <hr id='wrapper_get_4' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/subscription </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeSubscriptionBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeSubscriptionAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeSubscriptionBeta} newData={userMeSubscriptionAlpha} />


            {/* API get user me certifications */}
            <hr id='wrapper_get_5' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/certifications </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeCertificationsBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeCertificationsAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeCertificationsBeta} newData={userMeCertificationsAlpha} />

            {/* API get user me identity */}
            <hr id='wrapper_get_6' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/identity/{'{access_token}'} </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userIdentityBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userIdentityAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userIdentityBeta} newData={userIdentityAlpha} />

            {/* API get user me connections social */}
            <hr id='wrapper_get_7' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/connections/<span className='text-danger'>{socialType}</span> </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeConnectionsSocialBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeConnectionsSocialAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeConnectionsSocialBeta} newData={userMeConnectionsSocialAlpha} />

            {/* API get user me genres */}
            <hr id='wrapper_get_8' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/genres </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeGenresBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeGenresAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeGenresBeta} newData={userMeGenresAlpha} />

            {/* API get user me balance */}
            <hr id='wrapper_get_9' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/balance </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeBalanceBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeBalanceAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeBalanceBeta} newData={userMeBalanceAlpha} />

            {/* API get user me ga */}
            <hr id='wrapper_get_10' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/ga </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeGaBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeGaAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeGaBeta} newData={userMeGaAlpha} />

            {/* API get user me badge-counts */}
            <hr id='wrapper_get_11' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/badge-counts </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeBadgeCountBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeBadgeCountAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeBadgeCountBeta} newData={userMeBadgeCountAlpha} />

            {/* API get user me presents */}
            <hr id='wrapper_get_12' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/presents </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMePresentsBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMePresentsAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMePresentsBeta} newData={userMePresentsAlpha} />

            {/* API get user me library */}
            <hr id='wrapper_get_13' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/library/filters </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeLibraryBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeLibraryAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeLibraryBeta} newData={userMeLibraryAlpha} />

            {/* API get user me dailyfree/recent */}
            <hr id='wrapper_get_15' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/dailyfree/recent </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeDailyFreeBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeDailyFreeAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeDailyFreeBeta} newData={userMeDailyFreeAlpha} />

            {/* API get user me dailyfree/recent */}
            <hr id='wrapper_get_16' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/recents </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeRecentsBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeRecentsAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeRecentsBeta} newData={userMeRecentsAlpha} />

            {/* API get user me dailyfree/recent */}
            <hr id='wrapper_get_17' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/charges </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeChargesBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeChargesAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeChargesBeta} newData={userMeChargesAlpha} />

            {/* ====================== ====================== API get search user cms ======================  ====================== */}

            <hr id='wrapper_get_18' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/username?limit=10 &#160;
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#searchUsersCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="searchUsersCmsModal" tabIndex="-1" aria-labelledby="searchUsersCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="searchUsersCmsModalLabel">GET v2/users/username?limit=10</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">username or userId&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='username' onChange={(e) => handlePutChangeValue1(e, 6)} defaultValue={usernameSearch ? usernameSearch : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 4)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(getUserCmsSearchBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(getUserCmsSearchAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={getUserCmsSearchBeta} newData={getUserCmsSearchAlpha} />

            {/* API get user me invitations */}
            <hr id='wrapper_get_19' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'}/invitations </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeInvitationsBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeInvitationsAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeInvitationsBeta} newData={userMeInvitationsAlpha} />

            {/* API get user me v1 */}
            <hr id='wrapper_get_20' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'} </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeV1Beta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeV1Alpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeV1Beta} newData={userMeV1Alpha} />

            {/* API get user me meta v1 */}
            <hr id='wrapper_get_21' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'}/meta </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeMetaV1Beta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeMetaV1Alpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeMetaV1Beta} newData={userMeMetaV1Alpha} />

            {/* API get user me devices */}
            <hr id='wrapper_get_22' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'}/devices </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeDevicesBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeDevicesAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeDevicesBeta} newData={userMeDevicesAlpha} />


            {/* ==================================== ==================== PUT ==================== ==================================== */}
            {/* ==================================== ==================== PUT ==================== ==================================== */}

            {/* API put user me */}
            <hr id='wrapper_put_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> v2/users/{'{me}'} &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUserMeModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserMeModal" tabIndex="-1" aria-labelledby="putUserMeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserMeModalLabel">PUT v2/users/me</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label" >locale&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='locale' onChange={(e) => handlePutChangeValue1(e, 1)} defaultValue={putUserMe ? putUserMe.locale : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">isAdultFilterOn&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='isAdultFilterOn' onChange={(e) => handlePutChangeValue1(e, 1)} defaultValue={putUserMe ? putUserMe.isAdultFilterOn : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">birthDate&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='birthDate' onChange={(e) => handlePutChangeValue1(e, 1)} defaultValue={putUserMe ? putUserMe.birthDate : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">gender&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='gender' onChange={(e) => handlePutChangeValue1(e, 1)} defaultValue={putUserMe ? putUserMe.gender : null} />
                          </span>

                          <label htmlFor="" className="col-form-label">agreements :&#160;</label>
                          <span>
                            <label htmlFor="" className="col-form-label">marketingEmail&#160;</label>
                            <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                              id='marketingEmail' name='marketingEmail' value={putUserMe.agreements.marketingEmail} onChange={(e) => handlePutChangeValue2(e, 1)}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">collectingBirth&#160;</label>
                            <label htmlFor="" className="col-form-label">collectingBirth&#160;</label>
                            <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                              id='socialTcollectingBirthype' name='collectingBirth' value={putUserMe.agreements.collectingBirth} onChange={(e) => handlePutChangeValue2(e, 1)}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">timer&#160;</label>
                            <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                              id='timer' name='timer' value={putUserMe.agreements.timer} onChange={(e) => handlePutChangeValue2(e, 1)}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">subscription&#160;</label>
                            <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                              id='subscription' name='subscription' value={putUserMe.agreements.subscription} onChange={(e) => handlePutChangeValue2(e, 1)}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          </span>

                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserMeBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserMeAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeBeta} newData={putUserMeAlpha} />

            {/* ====================== ====================== API put user me password ======================  ====================== */}

            <hr id='wrapper_put_2' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> /users/{'{me}'}/password &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUserPasswordModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserPasswordModal" tabIndex="-1" aria-labelledby="putUserPasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserPasswordModalLabel">PUT /users/me/password</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">oldPassword&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue1(e, 2)} defaultValue={putUserPassword ? putUserPassword.password : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">newPassword&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='newPassword' onChange={(e) => handlePutChangeValue1(e, 2)} defaultValue={putUserPassword ? putUserPassword.newPassword : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 12)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMePasswordBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMePassowrdAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMePasswordBeta} newData={putUserMePassowrdAlpha} />

            {/* ====================== ====================== API put user me username ======================  ====================== */}

            <hr id='wrapper_put_3' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> /users/{'{me}'}/username &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUserUsernameModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserUsernameModal" tabIndex="-1" aria-labelledby="putUserUsernameModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserUsernameModalLabel">PUT /users/me/username</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">New username&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='username' onChange={(e) => handlePutChangeValue1(e, 3)} defaultValue={putUserUsername ? putUserUsername.username : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">password&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue1(e, 3)} defaultValue={putUserUsername ? putUserUsername.password : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 13)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUsernameBeta} newData={putUserMeUsernameAlpha} />

            {/* ====================== ====================== API put user me social ======================  ====================== */}

            <hr id='wrapper_put_4' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> /users/{'{me}'}/connect/{socialTypePut} &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUsersocialModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUsersocialModal" tabIndex="-1" aria-labelledby="putUsersocialModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUsersocialModalLabel">PUT /users/me/connect/{socialTypePut}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">accessToken&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='accessToken' onChange={(e) => handlePutChangeValue1(e, 4)} defaultValue={putUserUsername ? putUserUsername.username : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUsernameBeta} newData={putUserMeUsernameAlpha} />

            {/* ====================== ====================== API post user me unregister cms ======================  ====================== */}

            <hr id='wrapper_put_6' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> v2/users/{'{me}'}/unregister {'(cms)'} &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postUserUnregisterCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postUserUnregisterCmsModal" tabIndex="-1" aria-labelledby="postUserUnregisterCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postUserUnregisterCmsModalLabel">PUT /users/me/unregister {'(cms)'}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 2)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsUnregisterBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsUnregisterAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserCmsUnregisterBeta} newData={postUserCmsUnregisterAlpha} />

            {/* ====================== ====================== API post user me unregister cms ======================  ====================== */}

            <hr id='wrapper_put_7' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> v2/users/{'{me}'}/reregister {'(cms)'} &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postUsersCmsReregisterCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postUsersCmsReregisterCmsModal" tabIndex="-1" aria-labelledby="postUsersCmsReregisterCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postUsersCmsReregisterCmsModalLabel">PUT v2/users/{'{me}'}/reregister</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 3)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsReregisterBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsReregisterAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserCmsReregisterBeta} newData={postUserCmsReregisterAlpha} />

            {/* ====================================POST==================================== */}
            {/* API get user me devices */}

            {/* ====================== ====================== API post user me signin ======================  ====================== */}

            {/* API post user signin */}
            <hr id='wrapper_post_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> users/signin </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(userBeta, null, 2)) : (<>  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(userAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userBeta} newData={userAlpha} />

            {/* ====================== ====================== API post user me unregister ======================  ====================== */}

            <hr id='wrapper_post_2' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> v2/users/{'{me}'}/unregister &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#putUserUnregisterModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserUnregisterModal" tabIndex="-1" aria-labelledby="putUserUnregisterModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserUnregisterModalLabel">POST v2/users/{'{me}'}/unregister</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">password&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue1(e, 5)} defaultValue={putUnregister ? putUnregister.password : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">reason&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='reason' onChange={(e) => handlePutChangeValue1(e, 5)} defaultValue={putUnregister ? putUnregister.reason : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">kind&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='kind' onChange={(e) => handlePutChangeValue1(e, 5)} defaultValue={putUnregister ? putUnregister.kind : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">selected&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='selected' onChange={(e) => handlePutChangeValue1(e, 5)} defaultValue={putUnregister ? putUnregister.selected : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">cause&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='cause' onChange={(e) => handlePutChangeValue1(e, 5)} defaultValue={putUnregister ? putUnregister.cause : null} />
                          </span>

                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 1)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUnregisterBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUnregisterAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUnregisterBeta} newData={putUserMeUnregisterAlpha} />

            {/* ====================== ====================== API post send verification email ======================  ====================== */}

            <hr id='wrapper_post_5' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> v2/verifications/send-mail &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#postSendverificationEmailModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postSendverificationEmailModal" tabIndex="-1" aria-labelledby="postSendverificationEmailModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postSendverificationEmailModalLabel">POST v2/verifications/send-mail</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">email&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='email' onChange={(e) => handlePutChangeValue1(e, 7)} defaultValue={verificationEmail ? verificationEmail : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 5)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postVerificationSendEmailBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postVerificationSendEmailAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postVerificationSendEmailBeta} newData={postVerificationSendEmailAlpha} />


            {/* ====================== ====================== API put verifications ======================  ====================== */}

            <hr id='wrapper_put_5' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> v2/verifications &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PutVerificationModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="PutVerificationModal" tabIndex="-1" aria-labelledby="PutVerificationModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="PutVerificationModalLabel">PUT v2/verifications</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="tokenAlpha" className="col-form-label">tokenAlpha&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="tokenAlpha" name='token' onChange={(e) => handlePutChangeValue1(e, 8)} defaultValue={putVerificationsAlpha ? putVerificationsAlpha.token : null} />
                          </span>

                          <span>
                            <label htmlFor="tokenBeta" className="col-form-label">tokenBeta&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="tokenBeta" name='token' onChange={(e) => handlePutChangeValue1(e, 10)} defaultValue={putVerificationsBeta ? putVerificationsBeta.token : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 6)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putVerificationsBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putVerificationsAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putVerificationsBeta} newData={putVerificationsAlpha} />

            {/* ====================================== API post sign up ====================================== */}
            <hr id='wrapper_post_6' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> /users/signup &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#postSignupModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postSignupModal" tabIndex="-1" aria-labelledby="postSignupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postSignupModalLabel">POST /users/signup</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">

                          <label htmlFor="" className="col-form-label">account :&#160;</label>
                          <span>
                            <label htmlFor="" className="col-form-label">username&#160;</label>
                            <span>
                              <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='username' onChange={(e) => handlePutChangeValue2(e, 3)} defaultValue={postSignupAlpha ? postSignupAlpha.account.username : null} />
                            </span>
                            <br />
                            <span>
                              <label htmlFor="" className="col-form-label">password&#160;</label>
                              <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue2(e, 3)} defaultValue={postSignupAlpha ? postSignupAlpha.account.password : null} />
                            </span>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">birthDate&#160;</label>
                            {postSignupAlpha.agreements.collectingBirth ? <><input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='birthDate' onChange={(e) => handlePutChangeValue1(e, 9)} defaultValue={postSignupAlpha ? postSignupAlpha.birthDate : null} /></> : <span className='text-muted'>- you must agree collecting birth to set birth -</span>}
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">gender&#160;</label>
                            {postSignupAlpha.agreements.collectingBirth ? <><input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='gender' onChange={(e) => handlePutChangeValue1(e, 9)} defaultValue={postSignupAlpha ? postSignupAlpha.gender : null} /></> : <span className='text-muted'>- you must agree collecting birth to set gender -</span>}
                          </span>

                          <label htmlFor="" className="col-form-label">agreements :&#160;</label>
                          <span>
                            <label htmlFor="" className="col-form-label">marketingEmail&#160;</label>
                            <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                              id='marketingEmail' name='marketingEmail' value={postSignupAlpha.agreements.marketingEmail} onChange={(e) => handlePutChangeValue2(e, 2)}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">collectingBirth&#160;</label>
                            <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                              id='socialTcollectingBirthype' name='collectingBirth' value={postSignupAlpha.agreements.collectingBirth} onChange={(e) => handlePutChangeValue2(e, 2)}>
                              <option value="true">true</option>
                              <option value="false">false</option>
                            </select>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">verificationTokenAlpha&#160;:</label>
                            <p>{postSignupAlpha ? postSignupAlpha.verificationToken : null}</p>
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">verificationTokenBeta&#160;:</label>
                            <p>{postSignupBeta ? postSignupBeta.verificationToken : null}</p>
                          </span>

                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 7)}>Send request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSignupBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSignupAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserSignupBeta} newData={postUserSignupAlpha} />

            {/* ====================================DEL==================================== */}

            {/* ====================== ====================== API del user me social ======================  ====================== */}

            <hr id='wrapper_del_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-danger'> &#160;<strong>DEL</strong></span> /users/{'{me}'}/connections/{socialTypeDel} &#160;

              <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delUserConnection" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="delUserConnection" tabIndex="-1" aria-labelledby="delUserConnectionLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="delUserConnectionLabel">DEL /users/{'{me}'}/connections/{socialTypeDel}</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 10)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(delUserMeSocialBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(delUserMeSocialAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserMeSocialBeta} newData={delUserMeSocialAlpha} />

            {/* ====================== ====================== API dell user bye ======================  ====================== */}

            <hr id='wrapper_del_2' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-danger'> &#160;<strong>DEL</strong></span> v2/users/bye &#160;
              <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delUserBye" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="delUserBye" tabIndex="-1" aria-labelledby="delUserByeLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="delUserByeLabel">DEL v2/users/bye</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 8)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserByeBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserByeAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserByeBeta} newData={delUserByeAlpha} />

            {/* ====================== ====================== API dell user bye ======================  ====================== */}

            <hr id='wrapper_del_3' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-danger'> &#160;<strong>DEL</strong></span> /users/me/devices/all &#160;
              <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delUserDeviceAll" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="delUserDeviceAll" tabIndex="-1" aria-labelledby="delUserDeviceAllLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="delUserDeviceAllLabel">DEL /users/me/devices/all</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 9)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesAllBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesAllAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserDevicesAllBeta} newData={delUserDevicesAllAlpha} />

            {/* ====================== ====================== API put verifications ======================  ====================== */}

            <hr id='wrapper_del_4' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-danger'> &#160;<strong>DEL</strong></span> /users/me/devices/deviceId &#160;
              <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DelDeviceByIdModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="DelDeviceByIdModal" tabIndex="-1" aria-labelledby="DelDeviceByIdModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="DelDeviceByIdModalLabel">DEL /users/me/devices/deviceId</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="tokenAlpha" className="col-form-label">deviceId&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="tokenAlpha" name='token' onChange={(e) => handlePutChangeValue1(e, 11)} defaultValue={delDeviceId ? delDeviceId : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 11)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesByIdBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesByIdBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserDevicesByIdBeta} newData={delUserDevicesByIdBeta} />

            {/* ====================== ====================== END OF API DEL ======================  ====================== */}

          </div>

          <div className='col-2 d-none d-lg-block'>
            <div className='sticky'>
              <div className='btn-group-vertical wrapper_sidebar btn-light' style={{ width: 240, backgroundColor: '#f8f9fa', borderRadius: 10 }}>
                <button type="button" className="btn text-danger" onClick={clickView} style={{ fontSize: '.74rem' }} data-bs-toggle="tooltip" title="Up">API</button>
                <div style={{ height: "535px", overflowY: "scroll" }}>
                  <a href={`#wrapper_get_1`}><button type="button" className="btn btn-md " style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeAlpha, userMeBeta)) ? "black" : "red" }}> v2/users/{"{me}"}</span></button></a>
                  <a href={`#wrapper_get_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeMetaAlpha, userMeMetaBeta)) ? "black" : "red" }}>  v2/users/{"{me}"}/meta </span> </button></a>
                  <a href={`#wrapper_get_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeCohortAlpha, userMeCohortBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/cohort </span> </button></a>
                  <a href={`#wrapper_get_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeSubscriptionAlpha, userMeSubscriptionBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/subscription </span> </button></a>
                  <a href={`#wrapper_get_5`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeCertificationsAlpha, userMeCertificationsBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/certifications </span> </button></a>
                  <a href={`#wrapper_get_6`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userIdentityAlpha, userIdentityBeta)) ? "black" : "red" }}> v2/users/identity/{"{access_token}"} </span> </button></a>
                  <a href={`#wrapper_get_7`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeConnectionsSocialAlpha, userMeConnectionsSocialBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/connections/{socialType} </span> </button></a>
                  <a href={`#wrapper_get_8`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeGenresAlpha, userMeGenresBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/genres </span> </button></a>
                  <a href={`#wrapper_get_9`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeBalanceAlpha, userMeBalanceBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/balance </span> </button></a>
                  <a href={`#wrapper_get_10`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeGaAlpha, userMeGaBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/ga </span> </button></a>
                  <a href={`#wrapper_get_11`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeBadgeCountAlpha, userMeBadgeCountBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/badge-counts </span> </button></a>
                  <a href={`#wrapper_get_12`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMePresentsAlpha, userMePresentsBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/presents </span> </button></a>
                  <a href={`#wrapper_get_13`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeLibraryAlpha, userMeLibraryBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/library/filters </span> </button></a>
                  <a href={`#wrapper_get_15`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeDailyFreeAlpha, userMeDailyFreeBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/daily/recent </span> </button></a>
                  <a href={`#wrapper_get_16`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeRecentsAlpha, userMeRecentsBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/recents </span> </button></a>
                  <a href={`#wrapper_get_17`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeChargesAlpha, userMeChargesBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/charges </span> </button></a>
                  <a href={`#wrapper_get_18`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(getUserCmsSearchAlpha, getUserCmsSearchBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/username?limit=10 </span> </button></a>

                  <a href={`#wrapper_get_19`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeInvitationsAlpha, userMeInvitationsBeta)) ? "black" : "red" }}> /users/{"{me}"}/invitations </span> </button></a>
                  <a href={`#wrapper_get_20`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeV1Alpha, userMeV1Beta)) ? "black" : "red" }}> /users/{"{me}"} </span> </button></a>
                  <a href={`#wrapper_get_21`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeMetaV1Alpha, userMeMetaV1Beta)) ? "black" : "red" }}> /users/{"{me}"}/meta </span> </button></a>
                  <a href={`#wrapper_get_22`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeDevicesAlpha, userMeDevicesBeta)) ? "black" : "red" }}> /users/{"{me}"}/devices </span> </button></a>

                  {/* ==================================================================================== PUT ====================================================================================*/}

                  <a href={`#wrapper_put_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha, putUserMeBeta)) ? "black" : "red" }}> v2/users/{"{me}"} </span></button></a>
                  <a href={`#wrapper_put_5`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putVerificationsAlpha, putVerificationsBeta)) ? "black" : "red" }}> v2/verifications</span> </button></a>
                  <a href={`#wrapper_put_6`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(postUserCmsUnregisterAlpha, postUserCmsUnregisterBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/unregister {"(cms)"}</span> </button></a>
                  <a href={`#wrapper_put_7`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(postUserCmsReregisterAlpha, postUserCmsReregisterBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/reregister {"(cms)"}</span> </button></a>


                  <a href={`#wrapper_put_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha, putUserMeBeta)) ? "black" : "red" }}> /users/{"{me}"}/password</span> </button></a>
                  <a href={`#wrapper_put_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha, putUserMeBeta)) ? "black" : "red" }}> /users/{"{me}"}/username</span> </button></a>
                  <a href={`#wrapper_put_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeSocialAlpha, putUserMeSocialBeta)) ? "black" : "red" }}> /users/{"{me}"}/connect/{socialTypePut}</span> </button></a>

                  {/* ==================================================================================== POST ====================================================================================*/}

                  <a href={`#wrapper_post_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(userAlpha, userBeta)) ? "black" : "red" }}> /users/signin</span> </button></a>
                  <a href={`#wrapper_post_6`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(postUserSignupAlpha, postUserSignupBeta)) ? "black" : "red" }}> /users/signup</span> </button></a>

                  <a href={`#wrapper_post_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(putUserMeUnregisterAlpha, putUserMeUnregisterBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/unregister</span> </button></a>
                  <a href={`#wrapper_post_5`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(postVerificationSendEmailAlpha, postVerificationSendEmailBeta)) ? "black" : "red" }}> v2/verifications/send-email</span> </button></a>

                  {/* ==================================================================================== DEL ====================================================================================*/}

                  <a href={`#wrapper_del_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserMeSocialAlpha, delUserMeSocialBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/connections/{socialTypeDel} </span></button></a>
                  <a href={`#wrapper_del_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserByeAlpha, delUserByeBeta)) ? "black" : "red" }}> v2/users/bye </span></button></a>
                  <a href={`#wrapper_del_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserDevicesAllAlpha, delUserDevicesAllBeta)) ? "black" : "red" }}> users/{"{me}"}/devices/all </span></button></a>
                  <a href={`#wrapper_del_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserDevicesByIdAlpha, delUserDevicesByIdBeta)) ? "black" : "red" }}> users/{"{me}"}/devices/deviceId </span></button></a>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));