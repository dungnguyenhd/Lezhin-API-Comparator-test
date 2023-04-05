import React from 'react';
import { render } from 'react-dom';
import { useEffect, useState } from 'react';
import JsonCompare from '../lib/index.js';
import compareService from './services/compareService.js';
import './style.css';
import { isEqual } from 'lodash';

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

      // call get /v2/users/{{me}/RedeemAttempt Alpha
      compareService.getUserMeRedeemAttemptAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeRedeemAttemptAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeRedeemAttemptAlpha', JSON.stringify(err.response.data));
      })

      // ============================== ============================== put API ============================== ==============================
      // ============================== ============================== put API ============================== ==============================

      // call put users/{me}/password alpha

      compareService.putUserMePasswordAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
        localStorage.setItem('putUserMePasswordAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMePasswordAlpha', JSON.stringify(err.response.data));
      })

      // call put users/{me}/username alpha

      compareService.putUserMeUsernameAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, { username: putUserUsername.username, password: putUserUsername.password }, locale).then((res) => {
        localStorage.setItem('putUserMeUsernameAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeUsernameAlpha', JSON.stringify(err.response.data));
      })

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

      // call del users/{me}/connect/{socialType} alpha

      if (isAutoDel) {
        compareService.delUserMeSocialAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, delUserSocial, socialTypeDel, locale).then((res) => {
          localStorage.setItem('delUserMeSocialAlpha', JSON.stringify(res.data));
        }).catch((err) => {
          localStorage.setItem('delUserMeSocialAlpha', JSON.stringify(err.response.data));
        })
      }


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

      // call get /v2/users/{{me}/RedeemAttempt Beta
      compareService.getUserMeRedeemAttemptBeta(userBeta.data.access_token, userBeta.data.user.userId, locale).then((res) => {
        localStorage.setItem('userMeRedeemAttemptBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('userMeRedeemAttemptBeta', JSON.stringify(err.response.data));
      })

      // ============================== ============================== put API ============================== ==============================
      // ============================== ============================== put API ============================== ==============================

      // call put users/{me} Beta
      compareService.putUserMeBeta(userBeta.data.access_token, userBeta.data.user.userId, putUserMe, locale).then((res) => {
        localStorage.setItem('putUserMeBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeBeta', JSON.stringify(err.response.data));
      })

      // call put users/{me}/password Beta

      compareService.putUserMePasswordBeta(userBeta.data.access_token, userBeta.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
        localStorage.setItem('putUserMePasswordBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMePasswordBeta', JSON.stringify(err.response.data));
      })

      // call put users/{me}/username Beta

      compareService.putUserMeUsernameBeta(userBeta.data.access_token, userBeta.data.user.userId, { username: putUserUsername.username, password: putUserUsername.password }, locale).then((res) => {
        localStorage.setItem('putUserMeUsernameBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeUsernameBeta', JSON.stringify(err.response.data));
      })

      // call put users/{me}/connection/{social-type} Beta

      compareService.putUserMeSocialBeta(userBeta.data.access_token, userBeta.data.user.userId, putUserSocial, socialTypePut, locale).then((res) => {
        localStorage.setItem('putUserMeSocialBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeSocialBeta', JSON.stringify(err.response.data));
      })

      // ============================== ============================== del API ============================== ==============================
      // ============================== ============================== del API ============================== ==============================

      // call del users/{me}/connect/{socialType} Beta

      if (isAutoDel) {
        compareService.delUserMeSocialBeta(userBeta.data.access_token, userBeta.data.user.userId, delUserSocial, socialTypeDel, locale).then((res) => {
          localStorage.setItem('delUserMeSocialBeta', JSON.stringify(res.data));
        }).catch((err) => {
          localStorage.setItem('delUserMeSocialBeta', JSON.stringify(err.response.data));
        })
      }

      //

    }
  }

  // get Local Storage Data ===========================================================================================================================
  // get Local Storage Data ===========================================================================================================================

  const adminBeta = JSON.parse(localStorage.getItem('adminBeta'));
  const putUserCmsUnregisterBeta = JSON.parse(localStorage.getItem('putUserCmsUnregisterBeta'));
  const putUserCmsReregisterBeta = JSON.parse(localStorage.getItem('putUserCmsReregisterBeta'));
  const userBeta = JSON.parse(localStorage.getItem('userBeta'));
  const userMeMetaBeta = JSON.parse(localStorage.getItem('userMeMetaBeta'));
  const userMeBeta = JSON.parse(localStorage.getItem('userMeBeta'));
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
  const userMeRedeemAttemptBeta = JSON.parse(localStorage.getItem('userMeRedeemAttemptBeta'));
  const putUserMeBeta = JSON.parse(localStorage.getItem('putUserMeBeta'));
  const putUserMePasswordBeta = JSON.parse(localStorage.getItem('putUserMePasswordBeta'));
  const putUserMeUsernameBeta = JSON.parse(localStorage.getItem('putUserMeUsernameBeta'));
  const putUserMeSocialBeta = JSON.parse(localStorage.getItem('putUserMeSocialBeta'));
  const putUserMeUnregisterBeta = JSON.parse(localStorage.getItem('putUserMeUnregisterBeta'));
  const delUserMeSocialBeta = JSON.parse(localStorage.getItem('delUserMeSocialBeta'));

  // ----

  const adminAlpha = JSON.parse(localStorage.getItem('adminAlpha'));
  const putUserCmsUnregisterAlpha = JSON.parse(localStorage.getItem('putUserCmsUnregisterAlpha'));
  const putUserCmsReregisterAlpha = JSON.parse(localStorage.getItem('putUserCmsReregisterAlpha'));
  const userAlpha = JSON.parse(localStorage.getItem('userAlpha'));
  const userMeMetaAlpha = JSON.parse(localStorage.getItem('userMeMetaAlpha'));
  const userMeAlpha = JSON.parse(localStorage.getItem('userMeAlpha'));
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
  const userMeRedeemAttemptAlpha = JSON.parse(localStorage.getItem('userMeRedeemAttemptAlpha'));
  const putUserMeAlpha = JSON.parse(localStorage.getItem('putUserMeAlpha'));
  const putUserMePassowrdAlpha = JSON.parse(localStorage.getItem('putUserMePasswordAlpha'));
  const putUserMeUsernameAlpha = JSON.parse(localStorage.getItem('putUserMeUsernameAlpha'));
  const putUserMeSocialAlpha = JSON.parse(localStorage.getItem('putUserMeSocialAlpha'));
  const putUserMeUnregisterAlpha = JSON.parse(localStorage.getItem('putUserMeUnregisterAlpha'));
  const delUserMeSocialAlpha = JSON.parse(localStorage.getItem('delUserMeSocialAlpha'));

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
    if (t == 1) {
      data = { ...putUserMe };
      data[name] = value;
      setPutUserMe(data);
    } else if (t == 2) {
      data = { ...putUserPassword };
      data[name] = value;
      setPutUserPassword(data);
    } else if (t == 3) {
      data = { ...putUserUsername };
      data[name] = value;
      setPutUserUsername(data);
    } else if (t == 4) {
      data = { ...putUserSocial };
      data[name] = value;
    } else if (t == 5) {
      data = { ...putUnregister };
      data[name] = value;
    }
  }

  const handlePutChangeValue2 = (e, t) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    let data;
    let value1;
    if (t == 1) {
      data = { ...putUserMe };
      if (value == 'false') { value1 = false } else if (value1 == 'true') { value = true } else { value1 = true }
      data.agreements[name] = value1;
      setPutUserMe(data);
    }
  }

  const handleSelectSocialType = (e, t) => {
    if (t == 1) {
      setSocialType(e.target.value);
    } else if (t == 2) {
      setSocialTypePut(e.target.value);
    } else {
      setSocialTypeDel(e.target.value);
    }
  }

  const handleSelectLocale = (e) => {
    setLocale(e.target.value);
  }

  const handleSelectAuto = (e, t) => {
    if (t == 1) {
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
    } else if (t == 2) {
      if (e.target.value == 'false') {
        setIsAutoPost(false);
        setPutUnregister(null);
      } else {
        setIsAutoPost(true);
        setPutUnregister({ password: 'lezhin123!', reason: 'test', kind: '123', selected: '123', cause: '23' });
      }
    } else if (t == 3) {
      if (e.target.value == 'false') {
        setIsAutoDel(false);
      } else {
        setIsAutoDel(true);
      }
    }
  }

  const handClickRequest = (e, t) => {
    if (userAlpha || userBeta && t == 1) {

      // call post users/{me}/unregister alpha

      compareService.putUserMeUnregisterAlpha(userAlpha.data.access_token, userAlpha.data.user.userId, putUnregister, locale).then((res) => {
        localStorage.setItem('putUserMeUnregisterAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeUnregisterAlpha', JSON.stringify(err.response.data));
      })

      // call post users/{me}/unregister Beta

      compareService.putUserMeUnregisterBeta(userBeta.data.access_token, userBeta.data.user.userId, putUnregister, locale).then((res) => {
        localStorage.setItem('putUserMeUnregisterBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserMeUnregisterBeta', JSON.stringify(err.response.data));
      })

    } else if (adminAlpha.data != null && adminBeta.data != null && t == 2) {

      // call post v2/users/{me}/unregister cms alpha

      compareService.putUserCmsUnregisterAlpha(adminAlpha.access_token, userAlpha.data.user.userId, null).then((res) => {
        localStorage.setItem('putUserCmsUnregisterAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserCmsUnregisterAlpha', JSON.stringify(err.response.data));
      })

      // call post v2/users/{me}/unregister cms Beta

      compareService.putUserCmsUnregisterBeta(adminBeta.access_token, userBeta.data.user.userId, null).then((res) => {
        localStorage.setItem('putUserCmsUnregisterBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserCmsUnregisterBeta', JSON.stringify(err.response.data));
      })

    } else if (adminAlpha.data != null && adminBeta.data != null && t == 3) {

      // call post v2/users/{me}/Reregister cms alpha

      compareService.putUserCmsReregisterAlpha(adminAlpha.access_token, userAlpha.data.user.userId, null).then((res) => {
        localStorage.setItem('putUserCmsReregisterAlpha', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserCmsReregisterAlpha', JSON.stringify(err.response.data));
      })

      // call post v2/users/{me}/Reregister cms Beta

      compareService.putUserCmsReregisterBeta(adminBeta.access_token, userBeta.data.user.userId, null).then((res) => {
        localStorage.setItem('putUserCmsReregisterBeta', JSON.stringify(res.data));
      }).catch((err) => {
        localStorage.setItem('putUserCmsReregisterBeta', JSON.stringify(err.response.data));
      })
    }
  }

  // return ===========================================================================================================================
  // return ===========================================================================================================================

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='col-4 ms-4 me-4 mt-4'>
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
                      className="btn btn-primary btn-block mb mt-3"
                      style={{ padding: "5px 30px" }}
                      onClick={handleReload}
                    >
                      <span style={{ fontSize: 13 }}>Try other user</span>
                    </button>
                  </div>
                </>
              )}
          </div>
          <div className='col-7 text-center text-danger h1 pt-5 mt-5' style={{ backgroundImage: `url(https://image.slidesdocs.com/responsive-images/background/white-clean-abstract-portfolio-simple-powerpoint-background_a97a4601d6__960_540.jpg)`, backgroundRepeat: "no-repeat", backgroundSize: "auto" }}> <span>Lezhin API Comparator</span> </div>
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
            <JsonCompare oldData={userMeBeta} newData={userMeAlpha} />

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

            {/* API get user me redeem-attempt */}
            <hr id='wrapper_get_14' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/redeem-attempt </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeRedeemAttemptBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeRedeemAttemptAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeRedeemAttemptBeta} newData={userMeRedeemAttemptAlpha} />

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

            {/* API get user me devices */}
            <hr id='wrapper_get_18' />

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
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserMePasswordBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserMePassowrdAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserMeUsernameBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserMeUsernameAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserMeUsernameBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserMeUsernameAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUsernameBeta} newData={putUserMeUsernameAlpha} />



            {/* ====================================POST==================================== */}
            {/* API get user me devices */}

            {/* ====================== ====================== API post user me signin ======================  ====================== */}

            {/* API post user signin */}
            <hr id='wrapper_post_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> users/signin </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- Beta data:</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userBeta, null, 2)) : (<>  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserMeUnregisterBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserMeUnregisterAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUnregisterBeta} newData={putUserMeUnregisterAlpha} />

            {/* ====================== ====================== API post user me unregister cms ======================  ====================== */}

            <hr id='wrapper_post_3' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> v2/users/{'{me}'}/unregister {'(cms)'} &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#postUserUnregisterCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postUserUnregisterCmsModal" tabIndex="-1" aria-labelledby="postUserUnregisterCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postUserUnregisterCmsModalLabel">POST /users/me/unregister {'(cms)'}</h5>
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
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserCmsUnregisterBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserCmsUnregisterAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserCmsUnregisterBeta} newData={putUserCmsUnregisterAlpha} />

            {/* ====================== ====================== API post user me unregister cms ======================  ====================== */}

            <hr id='wrapper_post_4' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> v2/users/{'{me}'}/reregister {'(cms)'} &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#postUsersCmsReregisterCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postUsersCmsReregisterCmsModal" tabIndex="-1" aria-labelledby="postUsersCmsReregisterCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postUsersCmsReregisterCmsModalLabel">POST v2/users/{'{me}'}/reregister</h5>
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
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserCmsReregisterBeta, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserCmsReregisterAlpha, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserCmsReregisterBeta} newData={putUserCmsReregisterAlpha} />

            {/* ====================================DEL==================================== */}

            {/* ====================== ====================== API del user me social ======================  ====================== */}

            <hr id='wrapper_del_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-danger'> &#160;<strong>DEL</strong></span> /users/{'{me}'}/connections/{socialTypeDel} &#160;
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
                  <a href={`#wrapper_get_14`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeRedeemAttemptAlpha, userMeRedeemAttemptBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/redeem_attempt </span> </button></a>
                  <a href={`#wrapper_get_15`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeDailyFreeAlpha, userMeDailyFreeBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/daily/recent </span> </button></a>
                  <a href={`#wrapper_get_16`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeRecentsAlpha, userMeRecentsBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/recents </span> </button></a>
                  <a href={`#wrapper_get_17`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeChargesAlpha, userMeChargesBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/charges </span> </button></a>

                  <a href={`#wrapper_get_18`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeDevicesAlpha, userMeDevicesBeta)) ? "black" : "red" }}> /users/{"{me}"}/devices </span> </button></a>
                  <a href={`#wrapper_get_19`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeInvitationsAlpha, userMeInvitationsBeta)) ? "black" : "red" }}> /users/{"{me}"}/invitations </span> </button></a>

                  {/* ==================================================================================== PUT ====================================================================================*/}

                  <a href={`#wrapper_put_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha, putUserMeBeta)) ? "black" : "red" }}> v2/users/{"{me}"} </span></button></a>
                  <a href={`#wrapper_put_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha, putUserMeBeta)) ? "black" : "red" }}> /users/{"{me}"}/password</span> </button></a>
                  <a href={`#wrapper_put_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha, putUserMeBeta)) ? "black" : "red" }}> /users/{"{me}"}/username</span> </button></a>
                  <a href={`#wrapper_put_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeSocialAlpha, putUserMeSocialBeta)) ? "black" : "red" }}> /users/{"{me}"}/connect/{socialTypePut}</span> </button></a>

                  {/* ==================================================================================== POST ====================================================================================*/}

                  <a href={`#wrapper_post_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(userAlpha, userBeta)) ? "black" : "red" }}> /users/signin</span> </button></a>
                  <a href={`#wrapper_post_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(putUserMeUnregisterAlpha, putUserMeUnregisterBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/unregister</span> </button></a>
                  <a href={`#wrapper_post_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(putUserMeUnregisterAlpha, putUserMeUnregisterBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/unregister {"(cms)"}</span> </button></a>
                  <a href={`#wrapper_post_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(putUserMeUnregisterAlpha, putUserMeUnregisterBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/reregister {"(cms)"}</span> </button></a>

                  {/* ==================================================================================== DEL ====================================================================================*/}

                  <a href={`#wrapper_del_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserMeSocialAlpha, delUserMeSocialBeta)) ? "black" : "red" }}> v2/users/{"{me}"}/connections/{socialTypeDel} </span></button></a>

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