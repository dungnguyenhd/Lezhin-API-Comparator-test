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
  const [usernameSearch, setUsernameSearch] = useState({ userIdAlpha: null, userIdBeta: null });
  const [usernameInactiveSearch, setUsernameInactiveSearch] = useState({ userIdAlpha: null, userIdBeta: null });
  const [refundCmsSearch, setRefundCmsSearch] = useState({ userIdAlpha: null, userIdBeta: null });
  const [invitationCmsSearch, setInvitationCmsSearch] = useState({ userIdAlpha: null, userIdBeta: null });
  const [deviceCmsSearch, setDeviceCmsSearch] = useState({ userIdAlpha: null, userIdBeta: null });
  const [putVerificationsDataAlpha, setPutVerificationsDataAlpha] = useState({ email: verificationEmail, token: null });
  const [putVerificationsDataBeta, setPutVerificationsDataBeta] = useState({ email: verificationEmail, token: null });
  const [postSignupAlpha, setPostSignupApha] = useState({ agreements: { marketingEmail: false, collectingBirth: false }, birthDate: null, gender: null, account: { username: verificationEmail, password: null }, verificationToken: putVerificationsDataAlpha.token });
  const [postSignupBeta, setPostSignupBeta] = useState({ agreements: { marketingEmail: false, collectingBirth: false }, birthDate: null, gender: null, account: { username: verificationEmail, password: null }, verificationToken: putVerificationsDataBeta.token });
  const [verifyEmail, setVerifyEmail] = useState(null);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [delDeviceId, setDelDeviceId] = useState(null);
  const [postUserSendChangeEmailData, setPostUserSendChangeEmailData] = useState(null);
  const [postUserChangeEmailData, setPostUserChangeEmailData] = useState(null);
  const [postUserSendResetPasswordUsername, setPostUserSendResetPasswordUsername] = useState(null);
  const [putUserResetPasswordData, setPutUserResetPasswordData] = useState({ password: null, resetKey: null });
  const [env, setEnv] = useState('beta');

  const handleLogin = (e) => {
    e.preventDefault();
    setStateLogin({
      ...stateLogin
    })

    setPostUserSendChangeEmailData({ email: 'email mới', password: stateLogin.password });
    setIsLoading(true);
    const start = new Date();
    // call login alpha
    compareService.postLoginAlpha(stateLogin.username, stateLogin.password, locale).then((res) => {
      const timeTaken = (new Date()) - start;
      const userData = {
        response: res.data,
        timeTaken: timeTaken,
      };
      localStorage.setItem('userAlpha', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', true)

      setIsLoading(false);
    }).catch((err) => {
      if (err.response) {
        const timeTaken = (new Date()) - start;
        const userData = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userAlpha', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', false)
        setIsLoading(false);
      }
    });

    // call login beta
    compareService.postLoginBeta(stateLogin.username, stateLogin.password, locale).then((res) => {
      const timeTaken = (new Date()) - start;
      const userData = {
        response: res.data,
        timeTaken: timeTaken,
      };
      localStorage.setItem('userBeta', JSON.stringify(userData));
      setPutUserMe({ locale: res.data.data.user.locale, isAdultFilterOn: res.data.data.user.isAdultFilterOn, birthDate: res.data.data.user.birthDate, gender: res.data.data.user.gender, agreements: { marketingEmail: res.data.data.user.agreements.marketingEmail, collectingBirth: res.data.data.user.agreements.collectingBirth } });
    }).catch((err) => {
      if (err.response) {
        const timeTaken = (new Date()) - start;
        const userData = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userBeta', JSON.stringify(userData));
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
      const start = new Date();

      // call get users/me/meta alpha
      compareService.getUserMeMetaAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaAlpha', JSON.stringify(data));
      })

      // call get users/me alpha
      compareService.getUserMeAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeAlpha', JSON.stringify(data));
      })

      // call get users/me/meta alpha
      compareService.getUserMeMetaV1Alpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaV1Alpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaV1Alpha', JSON.stringify(data));
      })

      // call get users/me alpha
      compareService.getUserMeV1Alpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeV1Alpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeV1Alpha', JSON.stringify(data));
      })

      // call get users/me/cohort alpha
      compareService.getUserMeCohortAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCohortAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCohortApha', JSON.stringify(data));
      })

      // call get users/me/devices alpha
      compareService.getUserMeDevicesAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDevicesAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDevicesBeta', data);
      })

      // call get users/me/certifications alpha
      compareService.getUserMeCertificationsAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCertificationsAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCertificationsAlpha', JSON.stringify(data));
      })

      // call get users/me/identity alpha
      compareService.getUserIdentityAlpha(userAlpha.response.data.access_token, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userIdentityAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userIdentityAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/connections/Social alpha
      compareService.getUserMeConnectionsSocialAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, socialType, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeConnectionsSocialAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeConnectionsSocialAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/genres alpha
      compareService.getUserMeGenresAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGenresAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGenresAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/balance alpha
      compareService.getUserMeBalanceAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBalanceAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBalanceAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/ga alpha
      compareService.getUserMeGAAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGaAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGaAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/BadgeCount alpha
      compareService.getUserMeBadgeCountAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/BadgeCount alpha
      compareService.getUserMeBadgeCountAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBadgeCountAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/presents?offset=0&limit=50 alpha
      compareService.getUserMePresentsAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMePresentsAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMePresentsAlpha', JSON.stringify(data));
      })

      // call get v2/users/{{me}/subscription?limit=30&offset=0&sort=createdAt&filter=all alpha
      compareService.getUserMeSubscriptionAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeSubscriptionAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeSubscriptionAlpha', JSON.stringify(data));
      })

      // call get /users/{{me}/invitations?page=0&limit=10 alpha
      compareService.getUserMeInvitationsAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeInvitationsAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeInvitationsAlpha', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/library/filters alpha
      compareService.getUserMeLibraryAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeLibraryAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeLibraryAlpha', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/dailyfree/recent Alpha
      compareService.getUserMeDailyFreeAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDailyFreeAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDailyFreeAlpha', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/recents Alpha
      compareService.getUserMeRecentsAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeRecentsAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeRecentsAlpha', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/Charges Alpha
      compareService.getUserMeChargesAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeChargesAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeChargesAlpha', JSON.stringify(data));
      })

      // call get search user Alpha
      compareService.getUserCmsSearchUserAlpha(adminAlpha.access_token, usernameSearch).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(data));
      })

      // ============================== ============================== put API ============================== ==============================
      // ============================== ============================== put API ============================== ==============================

      // call put users/{me}/connect/{socialType} alpha

      // compareService.putUserMeSocialAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, putUserSocial, socialTypePut, locale).then((res) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: res.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeSocialAlpha', JSON.stringify(data));
      // }).catch((err) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: err.response.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeSocialAlpha', JSON.stringify(data));
      // })

      // // call put users/{me} alpha

      // compareService.putUserMeAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, putUserMe, locale).then((res) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: res.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeAlpha', JSON.stringify(data));
      //   setIsLoadingAlpha(false);
      //   setIsLoading(false);
      //   setIsLoadingBeta(false);
      // }).catch((err) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: err.response.data,
      //     timeTaken: timeTaken,
      //   };
      //   setIsLoadingAlpha(false);
      //   setIsLoading(false);
      //   setIsLoadingBeta(false);
      //   localStorage.setItem('putUserMeAlpha', JSON.stringify(data));
      // })

      // ============================== ============================== del API ============================== ==============================
      // ============================== ============================== del API ============================== ==============================



      // ==================================================== beta ======================================================================================
      // ==================================================== beta ======================================================================================


      // call get users/me beta
      compareService.getUserMeBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBeta', JSON.stringify(data));
      })

      // call get users/me/meta beta
      compareService.getUserMeMetaBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaBeta', JSON.stringify(data));
      })

      // call get users/me/cohort Beta
      compareService.getUserMeCohortBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCohortBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCohortBeta', JSON.stringify(data));
      })

      // call get users/me/Devices Beta
      compareService.getUserMeDevicesBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDevicesBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDevicesBeta', JSON.stringify(data));
      })

      // call get users/me/certifications Beta
      compareService.getUserMeCertificationsBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCertificationsBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeCertificationsBeta', JSON.stringify(data));
      })

      // call get users/me/identity Beta
      compareService.getUserIdentityBeta(userBeta.response.data.access_token, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userIdentityBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userIdentityBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/connections/Social Beta
      compareService.getUserMeConnectionsSocialBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, socialType, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeConnectionsSocialBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeConnectionsSocialBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/genres Beta
      compareService.getUserMeGenresBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGenresBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGenresBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/balance Beta
      compareService.getUserMeBalanceBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBalanceBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBalanceBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/ga Beta
      compareService.getUserMeGABeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGaBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeGaBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/BadgeCount Beta
      compareService.getUserMeBadgeCountBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBadgeCountBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeBadgeCountBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/presents?offset=0&limit=50 Beta
      compareService.getUserMePresentsBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMePresentsBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMePresentsBeta', JSON.stringify(data));
      })

      // call get v2/users/{{me}/subscription?limit=30&offset=0&sort=createdAt&filter=all Beta
      compareService.getUserMeSubscriptionBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeSubscriptionBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeSubscriptionBeta', JSON.stringify(data));
      })

      // call get /users/{{me}/invitations?page=0&limit=10 Beta
      compareService.getUserMeInvitationsBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeInvitationsBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeInvitationsBeta', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/library/filters Beta
      compareService.getUserMeLibraryBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeLibraryBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeLibraryBeta', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/dailyfree/recent Beta
      compareService.getUserMeDailyFreeBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDailyFreeBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeDailyFreeBeta', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/recents Beta
      compareService.getUserMeRecentsBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeRecentsBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeRecentsBeta', JSON.stringify(data));
      })

      // call get /v2/users/{{me}/Charges Beta
      compareService.getUserMeChargesBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeChargesBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeChargesBeta', JSON.stringify(data));
      })

      // call get users/me/meta Beta
      compareService.getUserMeMetaV1Beta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaV1Beta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeMetaV1Beta', JSON.stringify(data));
      })

      // call get users/me Beta
      compareService.getUserMeV1Beta(userBeta.response.data.access_token, userBeta.response.data.user.userId, locale).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeV1Beta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('userMeV1Beta', JSON.stringify(data));
      })

      // call post v2/get/{me}/Search cms Beta

      compareService.getUserCmsSearchUserBeta(adminBeta.access_token, usernameSearch).then((res) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: res.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(data));
      }).catch((err) => {
        const timeTaken = (new Date()) - start;
        const data = {
          response: err.response.data,
          timeTaken: timeTaken,
        };
        localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(data));
      })

      // ============================== ============================== put API ============================== ==============================
      // ============================== ============================== put API ============================== ==============================

      // call put users/{me} Beta
      // compareService.putUserMeBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, putUserMe, locale).then((res) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: res.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeBeta', JSON.stringify(data));
      // }).catch((err) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: err.response.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeBeta', JSON.stringify(data));
      // })

      // call put users/{me}/connection/{social-type} Beta

      // compareService.putUserMeSocialBeta(userBeta.response.data.access_token, userBeta.response.data.user.userId, putUserSocial, socialTypePut, locale).then((res) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: res.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeSocialBeta', JSON.stringify(data));
      // }).catch((err) => {
      //   const timeTaken = (new Date()) - start;
      //   const data = {
      //     response: err.response.data,
      //     timeTaken: timeTaken,
      //   };
      //   localStorage.setItem('putUserMeSocialBeta', JSON.stringify(data));
      // })

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
  const putUserMePasswordV2Beta = JSON.parse(localStorage.getItem('putUserMePasswordV2Beta'));
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
  const postUserSendChangeEmailBeta = JSON.parse(localStorage.getItem('postUserSendChangeEmailBeta'));
  const postUserChangeEmailBeta = JSON.parse(localStorage.getItem('postUserChangeEmailBeta'));
  const postUserSendResetPasswordBeta = JSON.parse(localStorage.getItem('postUserSendResetPasswordBeta'));
  const putUserResetPasswordBeta = JSON.parse(localStorage.getItem('putUserResetPasswordBeta'));
  const getUserInactiveCmsSearchUserBeta = JSON.parse(localStorage.getItem('getUserInactiveCmsSearchUserBeta'));
  const getRefundsCmsBeta = JSON.parse(localStorage.getItem('getRefundsCmsBeta'));
  const getInvitationsCmsBeta = JSON.parse(localStorage.getItem('getInvitationsCmsBeta'));
  const getDevicesCmsBeta = JSON.parse(localStorage.getItem('getDevicesCmsBeta'));

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
  const putUserMePasswordV2Alpha = JSON.parse(localStorage.getItem('putUserMePasswordV2Alpha'));
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
  const postUserSendChangeEmailAlpha = JSON.parse(localStorage.getItem('postUserSendChangeEmailAlpha'));
  const postUserChangeEmailAlpha = JSON.parse(localStorage.getItem('postUserChangeEmailAlpha'));
  const postUserSendResetPasswordAlpha = JSON.parse(localStorage.getItem('postUserSendResetPasswordAlpha'));
  const putUserResetPasswordAlpha = JSON.parse(localStorage.getItem('putUserResetPasswordAlpha'));
  const getUserInactiveCmsSearchUserAlpha = JSON.parse(localStorage.getItem('getUserInactiveCmsSearchUserAlpha'));
  const getRefundsCmsAlpha = JSON.parse(localStorage.getItem('getRefundsCmsAlpha'));
  const getInvitationsCmsAlpha = JSON.parse(localStorage.getItem('getInvitationsCmsAlpha'));
  const getDevicesCmsAlpha = JSON.parse(localStorage.getItem('getDevicesCmsAlpha'));

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
        if (!userBeta.response.error && !userAlpha.response.error) {
          setPutUserMe({ locale: userAlpha.response.data.user.locale, isAdultFilterOn: userAlpha.response.data.user.isAdultFilterOn, birthDate: userAlpha.response.data.user.birthDate, gender: userAlpha.response.data.user.gender, agreements: { marketingEmail: userAlpha.response.data.user.agreements.marketingEmail, collectingBirth: userAlpha.response.data.user.agreements.collectingBirth, timer: userAlpha.response.data.user.agreements.timer, subscription: userAlpha.response.data.user.agreements.subscription } });
          setPutUserPassword({ password: null, newPassword: null });
          setPutUserUsername({ username: userAlpha.response.data.user.username, password: 'lezhin123!' });
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
        setPutUserSocial(data)
        break;
      case 5:
        data = { ...putUnregister };
        data[name] = value;
        setPutUnregister(data);
        break;
      case 6:
        data = { ...usernameSearch };
        data[name] = value;
        setUsernameSearch(data);
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
        break;
      case 12:
        data = { ...postUserSendChangeEmailData };
        data[name] = value;
        setPostUserSendChangeEmailData(data);
        break;
      case 13:
        data = { ...postUserChangeEmailData };
        data[name] = value;
        setPostUserChangeEmailData(data);
        break;
      case 14:
        setPostUserSendResetPasswordUsername(value);
        break;
      case 15:
        data = { ...putUserResetPasswordData };
        data[name] = value;
        setPutUserResetPasswordData(data);
        break;
      case 16:
        data = { ...usernameInactiveSearch };
        data[name] = value;
        setUsernameInactiveSearch(data);
        break;
      case 17:
        data = { ...refundCmsSearch };
        data[name] = value;
        setRefundCmsSearch(data);
        break;
      case 18:
        data = { ...invitationCmsSearch };
        data[name] = value;
        setInvitationCmsSearch(data);
        break;
      case 19:
        data = { ...deviceCmsSearch };
        data[name] = value;
        setDeviceCmsSearch(data);
        break;
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

  const handleSelectEnv = (e) => {
    switch (e.target.value) {
      case 'beta':
        setEnv(e.target.value)
        compareService.switchEnvironment(1);
        break;
      case 'qa':
        setEnv(e.target.value)
        compareService.switchEnvironment(2);
        break;
      default:
        compareService.switchEnvironment(1);
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
            setPutUserMe({ locale: userAlpha.response.data.user.locale, isAdultFilterOn: userAlpha.response.data.user.isAdultFilterOn, birthDate: userAlpha.response.data.user.birthDate, gender: userAlpha.response.data.user.gender, agreements: { marketingEmail: userAlpha.response.data.user.agreements.marketingEmail, collectingBirth: userAlpha.response.data.user.agreements.collectingBirth, timer: userAlpha.response.data.user.agreements.timer, subscription: userAlpha.response.data.user.agreements.subscription } });
            setPutUserPassword({ password: null, newPassword: null });
            setPutUserUsername({ username: userAlpha.response.data.user.username, password: 'lezhin123!' });
            setPutUserSocial({ accessToken: null });
          }
        } else {
          setIsAutoPut(true);
          setPutUserMe({ locale: "ko-KR", isAdultFilterOn: true, birthDate: "19990304", gender: "male", agreements: { marketingEmail: true, collectingBirth: true, timer: true, subscription: true } });
          setPutUserUsername({ username: userAlpha ? userAlpha.response.data.user.username : null, password: 'lezhin123!' });
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
    e.preventDefault();

    if (userAlpha && userBeta) {
      const start = new Date();
      switch (t) {
        case 1:
          // call post users/{me}/unregister alpha
          setIsLoadingRequest(true);
          compareService.putUserMeUnregisterAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, putUnregister, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUnregisterAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUnregisterAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          // call post users/{me}/unregister Beta

          compareService.putUserMeUnregisterBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, putUnregister, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUnregisterBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUnregisterBeta', JSON.stringify(data));
          });

          break;
        case 2:
          // call post v2/users/{me}/unregister cms alpha
          setIsLoadingRequest(true);
          compareService.postUserCmsUnregisterAlpha(adminAlpha.access_token, userAlpha.response.data.user.userId, null).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsUnregisterAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsUnregisterAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          // call post v2/users/{me}/unregister cms Beta

          compareService.postUserCmsUnregisterBeta(adminBeta.access_token, userBeta.response.data.user.userId, null).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsUnregisterBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsUnregisterBeta', JSON.stringify(data));
          });

          break;
        case 3:

          // call post v2/users/{me}/Reregister cms alpha
          setIsLoadingRequest(true);
          compareService.postUserCmsReregisterAlpha(adminAlpha.access_token, userAlpha.response.data.user.userId, null).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsReregisterAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsReregisterAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          // call post v2/users/{me}/Reregister cms Beta

          compareService.postUserCmsReregisterBeta(adminBeta.access_token, userBeta.response.data.user.userId, null).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsReregisterBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserCmsReregisterBeta', JSON.stringify(data));
          });
          break;
        case 4:

          // call post v2/get/{me}/Search cms alpha
          setIsLoadingRequest(true);
          compareService.getUserCmsSearchUserAlpha(adminAlpha.access_token, usernameSearch.userIdAlpha).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserCmsSearchAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          // call post v2/get/{me}/Search cms Beta

          compareService.getUserCmsSearchUserBeta(adminBeta.access_token, usernameSearch.userIdBeta).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserCmsSearchBeta', JSON.stringify(data));
          });
          break;

        case 8:
          // send del user bye
          setIsLoadingRequest(true);
          compareService.delUserByeAlpha(userAlpha.response.data.access_token).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserByeAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserByeAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.delUserByeBeta(userBeta.response.data.access_token).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserByeBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserByeBeta', JSON.stringify(data));
          });

          break;
        case 9:
          // send del user devices all
          setIsLoadingRequest(true);
          compareService.delUserDevicesAllAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesAllAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesAllAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.delUserDevicesAllBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesAllBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesAllBeta', JSON.stringify(data));
          });
          break;
        case 10:
          // call del users/{me}/connect/{socialType} alpha
          setIsLoadingRequest(true);
          compareService.delUserMeSocialAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, delUserSocial, socialTypeDel, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserMeSocialAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserMeSocialAlpha', JSON.stringify(data));
          });

          compareService.delUserMeSocialBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, delUserSocial, socialTypeDel, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserMeSocialBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserMeSocialBeta', JSON.stringify(data));
          });
          break;
        case 11:
          // send del user devices ById
          setIsLoadingRequest(true);
          compareService.delUserDevicesByIdAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesByIdAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesByIdAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.delUserDevicesByIdBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesByIdBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('delUserDevicesByIdBeta', JSON.stringify(data));
          });
          break;
        case 12:
          setIsLoadingRequest(true);
          // call put users/{me}/password Beta

          compareService.putUserMePasswordBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordBeta', JSON.stringify(data));
          })

          // call put users/{me}/password alpha

          compareService.putUserMePasswordAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordAlpha', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordAlpha', JSON.stringify(data));
          })
          break;
        case 13:
          setIsLoadingRequest(true);
          // call put users/{me}/username Beta

          compareService.putUserMeUsernameBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, { username: putUserUsername.username, password: putUserUsername.password }, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUsernameBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUsernameBeta', JSON.stringify(data));
          })

          // call put users/{me}/username alpha

          compareService.putUserMeUsernameAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, { username: putUserUsername.username, password: putUserUsername.password }, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUsernameAlpha', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMeUsernameAlpha', JSON.stringify(data));
          })
          break;
        case 14:
          setIsLoadingRequest(true);
          // call post send change email Beta

          compareService.postUserSendChangeEmailBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, postUserSendChangeEmailData, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendChangeEmailBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendChangeEmailBeta', JSON.stringify(data));
          })

          // call post send change email alpha

          setPostUserChangeEmailData({ email: postUserSendChangeEmailData ? postUserSendChangeEmailData.email : 'email mới', password: postUserSendChangeEmailData ? postUserSendChangeEmailData.password : 'lezhin123!', token: null });

          compareService.postUserSendChangeEmailAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, postUserSendChangeEmailData, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendChangeEmailAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendChangeEmailAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })
          break;
        case 15:
          setIsLoadingRequest(true);
          // call post send change email Beta

          compareService.postUserChangeEmailBeta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, postUserChangeEmailData, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserChangeEmailBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserChangeEmailBeta', JSON.stringify(data));
          })

          // call post send change email alpha

          compareService.postUserChangeEmailAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, postUserChangeEmailData, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserChangeEmailAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserChangeEmailAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })
          break;
        case 17:
          setIsLoadingRequest(true);
          // call put users/{me}/password Beta

          compareService.putUserMePasswordV2Beta(userBeta.response.data.access_token, userAlpha.response.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordV2Beta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordV2Beta', JSON.stringify(data));
          })

          // call put users/{me}/password alpha

          compareService.putUserMePasswordAlpha(userAlpha.response.data.access_token, userAlpha.response.data.user.userId, { password: putUserPassword.password, newPassword: putUserPassword.newPassword }, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordV2Alpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserMePasswordV2Alpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })
          break;
        case 20:
          setIsLoadingRequest(true);

          // call get search user Alpha
          compareService.getUserInactiveCmsSearchUserAlpha(adminAlpha.access_token, usernameInactiveSearch.userIdAlpha).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserInactiveCmsSearchUserAlpha', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserInactiveCmsSearchUserAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })

          compareService.getUserInactiveCmsSearchUserBeta(adminBeta.access_token, usernameInactiveSearch.userIdBeta).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserInactiveCmsSearchUserBeta', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getUserInactiveCmsSearchUserBeta', JSON.stringify(data));
          })
          break;
        case 21:
          setIsLoadingRequest(true);

          // call get search user Alpha
          compareService.getRefundsCmsAlpha(adminAlpha.access_token, refundCmsSearch.userIdAlpha).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getRefundsCmsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getRefundsCmsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })

          compareService.getRefundsCmsBeta(adminBeta.access_token, refundCmsSearch.userIdBeta).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getRefundsCmsBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getRefundsCmsBeta', JSON.stringify(data));
          })
          break;
        case 22:
          setIsLoadingRequest(true);

          // call get search user Alpha
          compareService.getInvitationsCmsAlpha(adminAlpha.access_token, invitationCmsSearch.userIdAlpha).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getInvitationsCmsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getInvitationsCmsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })

          compareService.getInvitationsCmsBeta(adminBeta.access_token, invitationCmsSearch.userIdBeta).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getInvitationsCmsBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getInvitationsCmsBeta', JSON.stringify(data));
          })
          break;
        case 23:
          setIsLoadingRequest(true);

          // call get search user Alpha
          compareService.getDevicesCmsAlpha(adminAlpha.access_token, deviceCmsSearch.userIdAlpha).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getDevicesCmsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getDevicesCmsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          })

          compareService.getInvitationsCmsBeta(adminBeta.access_token, deviceCmsSearch.userIdBeta).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getInvitationsCmsBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('getInvitationsCmsBeta', JSON.stringify(data));
          })
          break;
        default:
          break;
      }
    } else {
      const start = new Date();
      switch (t) {
        case 5:
          // send verification email
          setIsLoadingRequest(true);
          compareService.postVerificationSendEmailAlpha(verifyEmail).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postVerificationSendEmailAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postVerificationSendEmailAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.postVerificationSendEmailBeta(verifyEmail).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postVerificationSendEmailBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postVerificationSendEmailBeta', JSON.stringify(data));
          });

          break;
        case 6:
          // entry verification code
          setIsLoadingRequest(true);
          compareService.putVerificationsAlpha(putVerificationsDataAlpha).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putVerificationsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putVerificationsAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.putVerificationsBeta(putVerificationsDataBeta).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putVerificationsBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putVerificationsBeta', JSON.stringify(data));
          });

          break;
        case 7:
          // send post sign up user
          setIsLoadingRequest(true);
          compareService.postUserSignupAlpha(postSignupAlpha, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSignupAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSignupAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.postUserSignupBeta(postSignupBeta, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSignupBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSignupBeta', JSON.stringify(data));
          });

          break;
        case 18:
          setIsLoadingRequest(true);

          compareService.postUserSendResetPasswordAlpha(postUserSendResetPasswordUsername, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendResetPasswordAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendResetPasswordAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.postUserSendResetPasswordBeta(postUserSendResetPasswordUsername, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendResetPasswordBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('postUserSendResetPasswordBeta', JSON.stringify(data));
          });

          break;
        case 19:
          setIsLoadingRequest(true);

          compareService.putUserResetPasswordAlpha(putUserResetPasswordData, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserResetPasswordAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserResetPasswordAlpha', JSON.stringify(data));
            setIsLoadingRequest(false);
          });

          compareService.putUserResetPasswordBeta(putUserResetPasswordData, locale).then((res) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: res.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserResetPasswordBeta', JSON.stringify(data));
          }).catch((err) => {
            const timeTaken = (new Date()) - start;
            const data = {
              response: err.response.data,
              timeTaken: timeTaken,
            };
            localStorage.setItem('putUserResetPasswordBeta', JSON.stringify(data));
          });

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
                    <span className="title">- Alpha:</span> {userAlpha.response.data && !userAlpha.response.error ? userAlpha.response.data.user.username : (<>not found</>)} - {userAlpha.response.data && !userAlpha.response.error ? userAlpha.response.data.user.userId : (<>not found</>)}
                    <br /> <span className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} :</span> {userBeta.response.data && !userBeta.response.error ? userBeta.response.data.user.username : (<>not found</>)} - {userBeta.response.data && !userBeta.response.error ? userBeta.response.data.user.userId : <>not found</>}
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

                <br></br>

                Compare Env &#160;
                <select className="form-select-sm mt-1" style={{ fontSize: '.8rem' }} aria-label="Default select example"
                  id='socialTypeBase' value={env} onChange={handleSelectEnv}
                >
                  <option value="beta">Beta</option>
                  <option value="qa">QA</option>

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeBeta ? userMeBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeBeta ? userMeBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data ({userMeAlpha ? userMeAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeAlpha ? userMeAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            {!isLoadingAlpha ?
              <><JsonCompare oldData={userMeBeta ? userMeBeta.response : null} newData={userMeAlpha ? userMeAlpha.response : null} /></> : (<><div className='text-center'><img src='https://www.ucreative.com/wp-content/uploads/2014/09/fusion.gif' height={390} /> <br />
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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeMetaBeta ? userMeMetaBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeMetaBeta ? userMeMetaBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data ({userMeMetaAlpha ? userMeMetaAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeMetaAlpha ? userMeMetaAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeMetaBeta ? userMeMetaBeta.response : null} newData={userMeMetaAlpha ? userMeMetaAlpha.response : null} />

            {/* API get user me cohort */}
            <hr id='wrapper_get_3' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/cohort </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeCohortBeta ? userMeCohortBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeCohortBeta ? userMeCohortBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeCohortAlpha ? userMeCohortAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeCohortAlpha ? userMeCohortAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeCohortBeta ? userMeCohortBeta.response : null} newData={userMeCohortAlpha ? userMeCohortAlpha.response : null} />

            {/* API get user me presents */}
            <hr id='wrapper_get_4' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/subscription </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeSubscriptionBeta ? userMeSubscriptionBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeSubscriptionBeta ? userMeSubscriptionBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeSubscriptionAlpha ? userMeSubscriptionAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeSubscriptionAlpha ? userMeSubscriptionAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeSubscriptionBeta ? userMeSubscriptionBeta.response : null} newData={userMeSubscriptionAlpha ? userMeSubscriptionAlpha.response : null} />


            {/* API get user me certifications */}
            <hr id='wrapper_get_5' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/certifications </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeCertificationsBeta ? userMeCertificationsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeCertificationsBeta ? userMeCertificationsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeCertificationsAlpha ? userMeCertificationsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeCertificationsAlpha ? userMeCertificationsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeCertificationsBeta ? userMeCertificationsBeta.response : null} newData={userMeCertificationsAlpha ? userMeCertificationsAlpha.response : null} />

            {/* API get user me identity */}
            <hr id='wrapper_get_6' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/identity/{'{access_token}'} </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userIdentityBeta ? userIdentityBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userIdentityBeta ? userIdentityBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userIdentityAlpha ? userIdentityAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userIdentityAlpha ? userIdentityAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userIdentityBeta ? userIdentityBeta.response : null} newData={userIdentityAlpha ? userIdentityAlpha.response : null} />

            {/* API get user me connections social */}
            <hr id='wrapper_get_7' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/connections/<span className='text-danger'>{socialType}</span> </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeConnectionsSocialBeta ? userMeConnectionsSocialBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeConnectionsSocialBeta ? userMeConnectionsSocialBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeConnectionsSocialAlpha ? userMeConnectionsSocialAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeConnectionsSocialAlpha ? userMeConnectionsSocialAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeConnectionsSocialBeta ? userMeConnectionsSocialBeta.response : null} newData={userMeConnectionsSocialAlpha ? userMeConnectionsSocialAlpha.response : null} />

            {/* API get user me genres */}
            <hr id='wrapper_get_8' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/genres </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeGenresBeta ? userMeGenresBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeGenresBeta ? userMeGenresBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeGenresAlpha ? userMeGenresAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeGenresAlpha ? userMeGenresAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeGenresBeta ? userMeGenresBeta.response : null} newData={userMeGenresAlpha ? userMeGenresAlpha.response : null} />

            {/* API get user me balance */}
            <hr id='wrapper_get_9' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/balance </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeBalanceBeta ? userMeBalanceBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeBalanceBeta ? userMeBalanceBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeBalanceAlpha ? userMeBalanceAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeBalanceAlpha ? userMeBalanceAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeBalanceBeta ? userMeBalanceBeta.response : null} newData={userMeBalanceAlpha ? userMeBalanceAlpha.response : null} />

            {/* API get user me ga */}
            <hr id='wrapper_get_10' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/ga </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeGaBeta ? userMeGaBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeGaBeta ? userMeGaBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeGaAlpha ? userMeGaAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeGaAlpha ? userMeGaAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeGaBeta ? userMeGaBeta.response : null} newData={userMeGaAlpha ? userMeGaAlpha.response : null} />

            {/* API get user me badge-counts */}
            <hr id='wrapper_get_11' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/badge-counts </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeBadgeCountBeta ? userMeBadgeCountBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeBadgeCountBeta ? userMeBadgeCountBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeBadgeCountAlpha ? userMeBadgeCountAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeBadgeCountAlpha ? userMeBadgeCountAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeBadgeCountBeta ? userMeBadgeCountBeta.response : null} newData={userMeBadgeCountAlpha ? userMeBadgeCountAlpha.response : null} />

            {/* API get user me presents */}
            <hr id='wrapper_get_12' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/presents </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMePresentsBeta ? userMePresentsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMePresentsBeta ? userMePresentsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMePresentsAlpha ? userMePresentsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMePresentsAlpha ? userMePresentsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMePresentsBeta ? userMePresentsBeta.response : null} newData={userMePresentsAlpha ? userMePresentsAlpha.response : null} />

            {/* API get user me library */}
            <hr id='wrapper_get_13' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/library/filters </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeLibraryBeta ? userMeLibraryBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeLibraryBeta ? userMeLibraryBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeLibraryAlpha ? userMeLibraryAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeLibraryAlpha ? userMeLibraryAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeLibraryBeta ? userMeLibraryBeta.response : null} newData={userMeLibraryAlpha ? userMeLibraryAlpha.response : null} />

            {/* API get user me dailyfree/recent */}
            <hr id='wrapper_get_15' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/dailyfree/recent </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeDailyFreeBeta ? userMeDailyFreeBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeDailyFreeBeta ? userMeDailyFreeBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeDailyFreeAlpha ? userMeDailyFreeAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeDailyFreeAlpha ? userMeDailyFreeAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeDailyFreeBeta ? userMeDailyFreeBeta.response : null} newData={userMeDailyFreeAlpha ? userMeDailyFreeAlpha.response : null} />

            {/* API get user me dailyfree/recent */}
            <hr id='wrapper_get_16' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/recents </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeRecentsBeta ? userMeRecentsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeRecentsBeta ? userMeRecentsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeRecentsAlpha ? userMeRecentsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeRecentsAlpha ? userMeRecentsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeRecentsBeta ? userMeRecentsBeta.response : null} newData={userMeRecentsAlpha ? userMeRecentsAlpha.response : null} />

            {/* API get user me dailyfree/recent */}
            <hr id='wrapper_get_17' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> v2/users/{'{me}'}/charges </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeChargesBeta ? userMeChargesBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeChargesBeta ? userMeChargesBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeChargesAlpha ? userMeChargesAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeChargesAlpha ? userMeChargesAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeChargesBeta ? userMeChargesBeta.response : null} newData={userMeChargesAlpha ? userMeChargesAlpha.response : null} />

            {/* API get user me invitations */}
            <hr id='wrapper_get_19' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'}/invitations </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeInvitationsBeta ? userMeInvitationsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeInvitationsBeta ? userMeInvitationsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeInvitationsAlpha ? userMeInvitationsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeInvitationsAlpha ? userMeInvitationsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeInvitationsBeta ? userMeInvitationsBeta.response : null} newData={userMeInvitationsAlpha ? userMeInvitationsAlpha.response : null} />

            {/* API get user me v1 */}
            <hr id='wrapper_get_20' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'} </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeV1Beta ? userMeV1Beta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeV1Beta ? userMeV1Beta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeV1Alpha ? userMeV1Alpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeV1Alpha ? userMeV1Alpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeV1Beta ? userMeV1Beta.response : null} newData={userMeV1Alpha ? userMeV1Alpha.response : null} />

            {/* API get user me meta v1 */}
            <hr id='wrapper_get_21' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'}/meta </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeMetaV1Beta ? userMeMetaV1Beta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeMetaV1Beta ? userMeMetaV1Beta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeMetaV1Alpha ? userMeMetaV1Alpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeMetaV1Alpha ? userMeMetaV1Alpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeMetaV1Beta ? userMeMetaV1Beta.response : null} newData={userMeMetaV1Alpha ? userMeMetaV1Alpha.response : null} />

            {/* API get user me devices */}
            <hr id='wrapper_get_22' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /users/{'{me}'}/devices </div>
            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userMeDevicesBeta ? userMeDevicesBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(userMeDevicesBeta ? userMeDevicesBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({userMeDevicesAlpha ? userMeDevicesAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(userMeDevicesAlpha ? userMeDevicesAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userMeDevicesBeta ? userMeDevicesBeta.response : null} newData={userMeDevicesAlpha ? userMeDevicesAlpha.response : null} />


            {/* ==================================== ==================== PUT ==================== ==================================== */}
            {/* ==================================== ==================== PUT ==================== ==================================== */}

            {/* API put user me */}
            {/* <hr id='wrapper_put_1' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserMeBeta ? putUserMeBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(putUserMeBeta ? putUserMeBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserMeAlpha ? putUserMeAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(putUserMeAlpha ? putUserMeAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeBeta ? putUserMeBeta.response : null} newData={putUserMeAlpha ? putUserMeAlpha.response : null} /> */}

            {/* ====================== ====================== API put user me password ======================  ====================== */}

            {/* <hr id='wrapper_put_2' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserMePasswordBeta ? putUserMePasswordBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMePasswordBeta ? putUserMePasswordBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserMePassowrdAlpha ? putUserMePassowrdAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMePassowrdAlpha ? putUserMePassowrdAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMePasswordBeta ? putUserMePasswordBeta.response : null} newData={putUserMePassowrdAlpha ? putUserMePassowrdAlpha.response : null} /> */}

            {/* ====================== ====================== API put user me username ======================  ====================== */}

            {/* <hr id='wrapper_put_3' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserMeUsernameBeta ? putUserMeUsernameBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameBeta ? putUserMeUsernameBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserMeUsernameAlpha ? putUserMeUsernameAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameAlpha ? putUserMeUsernameAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUsernameBeta ? putUserMeUsernameBeta.response : null} newData={putUserMeUsernameAlpha ? putUserMeUsernameAlpha.response : null} /> */}

            {/* ====================== ====================== API put user me social ======================  ====================== */}

            {/* <hr id='wrapper_put_4' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserMeUsernameBeta ? putUserMeUsernameBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameBeta ? putUserMeUsernameBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserMeUsernameAlpha ? putUserMeUsernameAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUsernameAlpha ? putUserMeUsernameAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUsernameBeta ? putUserMeUsernameBeta.response : null} newData={putUserMeUsernameAlpha ? putUserMeUsernameAlpha.response : null} /> */}

            {/* ====================== ====================== API post user me unregister cms ======================  ====================== */}

            {/* <hr id='wrapper_put_6' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postUserCmsUnregisterBeta ? postUserCmsUnregisterBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsUnregisterBeta ? postUserCmsUnregisterBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postUserCmsUnregisterAlpha ? postUserCmsUnregisterAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsUnregisterAlpha ? postUserCmsUnregisterAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserCmsUnregisterBeta ? postUserCmsUnregisterBeta.response : null} newData={postUserCmsUnregisterAlpha ? postUserCmsUnregisterAlpha.response : null} /> */}

            {/* ====================== ====================== API post user me unregister cms ======================  ====================== */}

            {/* <hr id='wrapper_put_7' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postUserCmsReregisterBeta ? postUserCmsReregisterBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsReregisterBeta ? postUserCmsReregisterBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postUserCmsReregisterAlpha ? postUserCmsReregisterAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserCmsReregisterAlpha ? postUserCmsReregisterAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserCmsReregisterBeta ? postUserCmsReregisterBeta.response : null} newData={postUserCmsReregisterAlpha ? postUserCmsReregisterAlpha.response : null} /> */}

            {/* ====================== ====================== API put user me password ======================  ====================== */}

            {/* <hr id='wrapper_put_9' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> v2/users/{'{me}'}/password &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUserPasswordV2Modal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserPasswordV2Modal" tabIndex="-1" aria-labelledby="putUserPasswordV2ModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserPasswordV2ModalLabel">PUT v2/users/me/password</h5>
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
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 17)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserMePasswordV2Beta ? putUserMePasswordV2Beta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMePasswordV2Beta ? putUserMePasswordV2Beta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserMePasswordV2Alpha ? putUserMePasswordV2Alpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMePasswordV2Alpha ? putUserMePasswordV2Alpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMePasswordV2Beta ? putUserMePasswordV2Beta.response : null} newData={putUserMePasswordV2Alpha ? putUserMePasswordV2Alpha.response : null} /> */}

            {/* ====================================POST==================================== */}
            {/* API get user me devices */}

            {/* ====================== ====================== API post user me signin ======================  ====================== */}

            {/* API post user signin */}
            {/* <hr id='wrapper_post_1' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}> {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> users/signin </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({userBeta ? userBeta.timeTaken : null} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(userBeta ? userBeta.response : null, null, 2)) : (<>  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data ({userAlpha ? userAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(userAlpha ? userAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={userBeta ? userBeta.response : null} newData={userAlpha ? userAlpha.response : null} /> */}

            {/* ====================== ====================== API post user me unregister ======================  ====================== */}
{/* 
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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserMeUnregisterBeta ? putUserMeUnregisterBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUnregisterBeta ? putUserMeUnregisterBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserMeUnregisterAlpha ? putUserMeUnregisterAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserMeUnregisterAlpha ? putUserMeUnregisterAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserMeUnregisterBeta ? putUserMeUnregisterBeta.response : null} newData={putUserMeUnregisterAlpha ? putUserMeUnregisterAlpha.response : null} /> */}

            {/* ====================== ====================== API post send verification email ======================  ====================== */}

            {/* <hr id='wrapper_post_5' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postVerificationSendEmailBeta ? postVerificationSendEmailBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postVerificationSendEmailBeta ? postVerificationSendEmailBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postVerificationSendEmailAlpha ? postVerificationSendEmailAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postVerificationSendEmailAlpha ? postVerificationSendEmailAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postVerificationSendEmailBeta ? postVerificationSendEmailBeta.response : null} newData={postVerificationSendEmailAlpha ? postVerificationSendEmailAlpha.response : null} /> */}

            {/* ====================== ====================== API put verifications ======================  ====================== */}

            {/* <hr id='wrapper_put_5' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putVerificationsBeta ? putVerificationsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putVerificationsBeta ? putVerificationsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putVerificationsAlpha ? putVerificationsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putVerificationsAlpha ? putVerificationsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putVerificationsBeta ? putVerificationsBeta.response : null} newData={putVerificationsAlpha ? putVerificationsAlpha.response : null} /> */}

            {/* ====================================== API post sign up ====================================== */}
            {/* <hr id='wrapper_post_6' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postUserSignupBeta ? postUserSignupBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSignupBeta ? postUserSignupBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postUserSignupAlpha ? postUserSignupAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSignupAlpha ? postUserSignupAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserSignupBeta ? postUserSignupBeta.response : null} newData={postUserSignupAlpha ? postUserSignupAlpha.response : null} /> */}


            {/* ====================== ====================== API post send verification email ======================  ====================== */}

            {/* <hr id='wrapper_post_7' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> /v2/verifications/me/send-change-mail &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#postSendChangeEmailModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postSendChangeEmailModal" tabIndex="-1" aria-labelledby="postSendChangeEmailModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postSendChangeEmailModalLabel">POST /v2/verifications/me/send-change-mail</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">email&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='email' onChange={(e) => handlePutChangeValue1(e, 12)} defaultValue={postUserSendChangeEmailData ? postUserSendChangeEmailData.email : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">password&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue1(e, 12)} defaultValue={postUserSendChangeEmailData ? postUserSendChangeEmailData.password : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 14)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postUserSendChangeEmailBeta ? postUserSendChangeEmailBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSendChangeEmailBeta ? postUserSendChangeEmailBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postUserSendChangeEmailAlpha ? postUserSendChangeEmailAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSendChangeEmailAlpha ? postUserSendChangeEmailAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserSendChangeEmailBeta ? postUserSendChangeEmailBeta.response : null} newData={postUserSendChangeEmailAlpha ? postUserSendChangeEmailAlpha.response : null} /> */}

            {/* ====================== ====================== API post send verification email ======================  ====================== */}

            {/* <hr id='wrapper_put_8' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> /v2/users/me/email &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUserChangeEmailV2" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserChangeEmailV2" tabIndex="-1" aria-labelledby="putUserChangeEmailV2Label" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserChangeEmailV2Label">PUT /v2/users/me/email</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">email&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='email' onChange={(e) => handlePutChangeValue1(e, 13)} defaultValue={postUserChangeEmailData ? postUserChangeEmailData.email : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">password&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue1(e, 13)} defaultValue={postUserChangeEmailData ? postUserChangeEmailData.password : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">token&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='token' onChange={(e) => handlePutChangeValue1(e, 13)} defaultValue={postUserChangeEmailData ? postUserChangeEmailData.token : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 15)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postUserChangeEmailBeta ? postUserChangeEmailBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserChangeEmailBeta ? postUserChangeEmailBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postUserChangeEmailAlpha ? postUserChangeEmailAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserChangeEmailAlpha ? postUserChangeEmailAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserChangeEmailBeta ? postUserChangeEmailBeta.response : null} newData={postUserChangeEmailAlpha ? postUserChangeEmailAlpha.response : null} /> */}

            {/* ====================== ====================== API post send verification email ======================  ====================== */}

            {/* <hr id='wrapper_post_8' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-warning'> &#160;<strong>POST</strong></span> v2/users/me/password/reset &#160;
              <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#postUserSendResetPassword" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="postUserSendResetPassword" tabIndex="-1" aria-labelledby="postUserSendResetPasswordLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="postUserSendResetPasswordLabel">POST v2/users/me/password/reset</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">email&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='email' onChange={(e) => handlePutChangeValue1(e, 14)} defaultValue={postUserSendResetPasswordUsername ? postUserSendResetPasswordUsername : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 18)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({postUserSendResetPasswordBeta ? postUserSendResetPasswordBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSendResetPasswordBeta ? postUserSendResetPasswordBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({postUserSendResetPasswordAlpha ? postUserSendResetPasswordAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(postUserSendResetPasswordAlpha ? postUserSendResetPasswordAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={postUserSendResetPasswordBeta ? postUserSendResetPasswordBeta.response : null} newData={postUserSendResetPasswordAlpha ? postUserSendResetPasswordAlpha.response : null} /> */}

            {/* ====================== ====================== API post send verification email ======================  ====================== */}

            {/* <hr id='wrapper_put_10' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-primary'> &#160;<strong>PUT</strong></span> v2/users/password/reset &#160;
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#putUserResetPassword" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="putUserResetPassword" tabIndex="-1" aria-labelledby="putUserResetPasswordLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="putUserResetPasswordLabel">PUT v2/users/password/reset</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">password&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='password' onChange={(e) => handlePutChangeValue1(e, 15)} defaultValue={putUserResetPasswordData ? putUserResetPasswordData.password : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">resetKey&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='resetKey' onChange={(e) => handlePutChangeValue1(e, 15)} defaultValue={putUserResetPasswordData ? putUserResetPasswordData.resetKey : null} />
                          </span>
                        </div>
                      </form>
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 19)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({putUserResetPasswordBeta ? putUserResetPasswordBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserResetPasswordBeta ? putUserResetPasswordBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({putUserResetPasswordAlpha ? putUserResetPasswordAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(putUserResetPasswordAlpha ? putUserResetPasswordAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={putUserResetPasswordBeta ? putUserResetPasswordBeta.response : null} newData={putUserResetPasswordAlpha ? putUserResetPasswordAlpha.response : null} /> */}

            {/* ====================================DEL==================================== */}

            {/* ====================== ====================== API del user me social ======================  ====================== */}

            {/* <hr id='wrapper_del_1' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({delUserMeSocialBeta ? delUserMeSocialBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(delUserMeSocialBeta ? delUserMeSocialBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({delUserMeSocialAlpha ? delUserMeSocialAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(delUserMeSocialAlpha ? delUserMeSocialAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserMeSocialBeta ? delUserMeSocialBeta.response : null} newData={delUserMeSocialAlpha ? delUserMeSocialAlpha.response : null} /> */}

            {/* ====================== ====================== API dell user bye ======================  ====================== */}

            {/* <hr id='wrapper_del_2' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({delUserByeBeta ? delUserByeBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserByeBeta ? delUserByeBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({delUserByeAlpha ? delUserByeAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserByeAlpha ? delUserByeAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserByeBeta ? delUserByeBeta.response : null} newData={delUserByeAlpha ? delUserByeAlpha.response : null} /> */}

            {/* ====================== ====================== API dell user bye ======================  ====================== */}

            {/* <hr id='wrapper_del_3' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({delUserDevicesAllBeta ? delUserDevicesAllBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesAllBeta ? delUserDevicesAllBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({delUserDevicesAllAlpha ? delUserDevicesAllAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesAllAlpha ? delUserDevicesAllAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserDevicesAllBeta ? delUserDevicesAllBeta.response : null} newData={delUserDevicesAllAlpha ? delUserDevicesAllAlpha.response : null} /> */}

            {/* ====================== ====================== API put verifications ======================  ====================== */}

            {/* <hr id='wrapper_del_4' />

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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({delUserDevicesByIdBeta ? delUserDevicesByIdBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesByIdBeta ? delUserDevicesByIdBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({delUserDevicesByIdAlpha ? delUserDevicesByIdAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(delUserDevicesByIdAlpha ? delUserDevicesByIdAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={delUserDevicesByIdBeta ? delUserDevicesByIdBeta.response : null} newData={delUserDevicesByIdAlpha ? delUserDevicesByIdAlpha.response : null} /> */}

            {/* ====================== ====================== END OF API DEL ======================  ====================== */}


            {/* ====================== ====================== API get search user cms ======================  ====================== */}

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
                            <label htmlFor="" className="col-form-label">username or userId Alpha&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdAlpha' onChange={(e) => handlePutChangeValue1(e, 6)} defaultValue={usernameSearch ? usernameSearch.userIdAlpha : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">username or userId Beta&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdBeta' onChange={(e) => handlePutChangeValue1(e, 6)} defaultValue={usernameSearch ? usernameSearch.userIdBeta : null} />
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
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({getUserCmsSearchBeta ? getUserCmsSearchBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingBeta ? (JSON.stringify(getUserCmsSearchBeta ? getUserCmsSearchBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({getUserCmsSearchAlpha ? getUserCmsSearchAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingAlpha ? (JSON.stringify(getUserCmsSearchAlpha ? getUserCmsSearchAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={getUserCmsSearchBeta ? getUserCmsSearchBeta.response : null} newData={getUserCmsSearchAlpha ? getUserCmsSearchAlpha.response : null} />

            {/* ============================================================================================================================= */}

            <hr id='wrapper_get_23' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /v2/inactive_users/user_name?limit=10 &#160;
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#searchInactiveUsersCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="searchInactiveUsersCmsModal" tabIndex="-1" aria-labelledby="searchInactiveUsersCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="searchInactiveUsersCmsModalLabel">GET /v2/inactive_users/user_name?limit=10</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">username or userId Alpha&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdAlpha' onChange={(e) => handlePutChangeValue1(e, 16)} defaultValue={usernameSearch ? usernameSearch.userIdAlpha : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">username or userId Beta&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdBeta' onChange={(e) => handlePutChangeValue1(e, 16)} defaultValue={usernameSearch ? usernameSearch.userIdBeta : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 20)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({getUserInactiveCmsSearchUserBeta ? getUserInactiveCmsSearchUserBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getUserInactiveCmsSearchUserBeta ? getUserInactiveCmsSearchUserBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({getUserInactiveCmsSearchUserAlpha ? getUserInactiveCmsSearchUserAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getUserInactiveCmsSearchUserAlpha ? getUserInactiveCmsSearchUserAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={getUserInactiveCmsSearchUserBeta ? getUserInactiveCmsSearchUserBeta.response : null} newData={getUserInactiveCmsSearchUserAlpha ? getUserInactiveCmsSearchUserAlpha.response : null} />

            {/* ====================== ====================== API get search user cms ======================  ====================== */}

            <hr id='wrapper_get_24' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /v2/refunds?_=&limit=10&state=&userId=userId &#160;
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#searchRefundCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="searchRefundCmsModal" tabIndex="-1" aria-labelledby="searchRefundCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="searchRefundCmsModalLabel">GET /v2/refunds?_=&limit=10&state=&userId=userId</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">userId Alpha&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdAlpha' onChange={(e) => handlePutChangeValue1(e, 17)} defaultValue={refundCmsSearch ? refundCmsSearch.userIdAlpha : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">userId Beta&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdBeta' onChange={(e) => handlePutChangeValue1(e, 17)} defaultValue={refundCmsSearch ? refundCmsSearch.userIdBeta : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 21)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({getRefundsCmsBeta ? getRefundsCmsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getRefundsCmsBeta ? getRefundsCmsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({getRefundsCmsAlpha ? getRefundsCmsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getRefundsCmsAlpha ? getRefundsCmsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={getRefundsCmsBeta ? getRefundsCmsBeta.response : null} newData={getRefundsCmsAlpha ? getRefundsCmsAlpha.response : null} />

            {/* ====================== ====================== API get search user cms ======================  ====================== */}

            <hr id='wrapper_get_25' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /v2/users/userId/invitations?_=&limit=10 &#160;
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#searchInviteCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="searchInviteCmsModal" tabIndex="-1" aria-labelledby="searchInviteCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="searchInviteCmsModalLabel">GET /v2/users/userId/invitations?_=&limit=10</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">userId Alpha&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdAlpha' onChange={(e) => handlePutChangeValue1(e, 18)} defaultValue={invitationCmsSearch ? invitationCmsSearch.userIdAlpha : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">userId Beta&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdBeta' onChange={(e) => handlePutChangeValue1(e, 18)} defaultValue={invitationCmsSearch ? invitationCmsSearch.userIdBeta : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 22)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({getInvitationsCmsBeta ? getInvitationsCmsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getInvitationsCmsBeta ? getInvitationsCmsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({getInvitationsCmsAlpha ? getInvitationsCmsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getInvitationsCmsAlpha ? getInvitationsCmsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={getInvitationsCmsBeta ? getInvitationsCmsBeta.response : null} newData={getInvitationsCmsAlpha ? getInvitationsCmsAlpha.response : null} />

            {/* ====================== ====================== API get search user cms ======================  ====================== */}

            <hr id='wrapper_get_26' />

            <div className='p-2 highlight' style={{ border: '1px solid lightgrey', borderRadius: 5 }}>
              {'>'} <span className='text-success'> &#160;<strong>GET</strong></span> /v2/users/userId/devices?_= &#160;
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#searchDeviceCmsModal" data-bs-whatever="@mdo"><i className="fa fa-user-edit" style={{ fontSize: ".8rem" }}></i></button>

              <div className="modal fade" id="searchDeviceCmsModal" tabIndex="-1" aria-labelledby="searchDeviceCmsModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="searchDeviceCmsModalLabel">GET /v2/users/userId/devices?_=</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="row align-items-center">
                          <span>
                            <label htmlFor="" className="col-form-label">userId Alpha&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdAlpha' onChange={(e) => handlePutChangeValue1(e, 19)} defaultValue={refundCmsSearch ? refundCmsSearch.userIdAlpha : null} />
                          </span>

                          <span>
                            <label htmlFor="" className="col-form-label">userId Beta&#160;</label>
                            <input className="" style={{ fontSize: ".8rem" }} aria-describedby="passwordHelpInline" name='userIdBeta' onChange={(e) => handlePutChangeValue1(e, 19)} defaultValue={refundCmsSearch ? refundCmsSearch.userIdBeta : null} />
                          </span>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e) => handClickRequest(e, 23)}>Send Request</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="origin-data pt-3">
              <div className="old-data">
                <p className="title">- {env.charAt(0).toUpperCase() + env.slice(1)} data ({getDevicesCmsBeta ? getDevicesCmsBeta.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getDevicesCmsBeta ? getDevicesCmsBeta.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
              <div className="new-data">
                <p className="title">- Alpha data:({getDevicesCmsAlpha ? getDevicesCmsAlpha.timeTaken : 'NaN'} ms)</p>
                <pre>{!isLoadingRequest ? (JSON.stringify(getDevicesCmsAlpha ? getDevicesCmsAlpha.response : null, null, 2)) : (<><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className='ps-2'>Calling API</span></>)}</pre>
              </div>
            </div>

            <p className="title">- The merged different:</p>
            <JsonCompare oldData={getDevicesCmsBeta ? getDevicesCmsBeta.response : null} newData={getDevicesCmsAlpha ? getDevicesCmsAlpha.response : null} />

            {/* ================================================================================================================================== */}
          </div>

          <div className='col-2 d-none d-lg-block'>
            <div className='sticky'>
              <div className='btn-group-vertical wrapper_sidebar btn-light' style={{ width: 240, backgroundColor: '#f8f9fa', borderRadius: 10 }}>
                <button type="button" className="btn text-danger" onClick={clickView} style={{ fontSize: '.74rem' }} data-bs-toggle="tooltip" title="Up">API</button>
                <div style={{ height: "535px", overflowY: "scroll" }}>
                  <a href={`#wrapper_get_1`}><button type="button" className="btn btn-md " style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeAlpha ? userMeAlpha.response : null, userMeBeta ? userMeBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}</span></button></a>
                  <a href={`#wrapper_get_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeMetaAlpha ? userMeMetaAlpha.response : null, userMeMetaBeta ? userMeMetaBeta.response : null)) ? "black" : "red" }}>  v2/users/{"{me}"}/meta </span> </button></a>
                  <a href={`#wrapper_get_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeCohortAlpha ? userMeCohortAlpha.response : null, userMeCohortBeta ? userMeCohortBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/cohort </span> </button></a>
                  <a href={`#wrapper_get_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeSubscriptionAlpha ? userMeSubscriptionAlpha.response : null, userMeSubscriptionBeta ? userMeSubscriptionBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/subscription </span> </button></a>
                  <a href={`#wrapper_get_5`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeCertificationsAlpha ? userMeCertificationsAlpha.response : null, userMeCertificationsBeta ? userMeCertificationsBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/certifications </span> </button></a>
                  <a href={`#wrapper_get_6`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userIdentityAlpha ? userIdentityAlpha.response : null, userIdentityBeta ? userIdentityBeta.response : null)) ? "black" : "red" }}> v2/users/identity/{"{access_token}"} </span> </button></a>
                  <a href={`#wrapper_get_7`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeConnectionsSocialAlpha ? userMeMetaBeta.response : null, userMeConnectionsSocialBeta ? userMeMetaBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/connections/{socialType} </span> </button></a>
                  <a href={`#wrapper_get_8`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeGenresAlpha ? userMeGenresAlpha.response : null, userMeGenresBeta ? userMeGenresBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/genres </span> </button></a>
                  <a href={`#wrapper_get_9`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeBalanceAlpha ? userMeBalanceAlpha.response : null, userMeBalanceBeta ? userMeBalanceBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/balance </span> </button></a>
                  <a href={`#wrapper_get_10`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeGaAlpha ? userMeGaAlpha.response : null, userMeGaBeta ? userMeGaBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/ga </span> </button></a>
                  <a href={`#wrapper_get_11`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeBadgeCountAlpha ? userMeBadgeCountAlpha.response : null, userMeBadgeCountBeta ? userMeBadgeCountBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/badge-counts </span> </button></a>
                  <a href={`#wrapper_get_12`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMePresentsAlpha ? userMePresentsAlpha.response : null, userMePresentsBeta ? userMePresentsBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/presents </span> </button></a>
                  <a href={`#wrapper_get_13`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeLibraryAlpha ? userMeLibraryAlpha.response : null, userMeLibraryBeta ? userMeLibraryBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/library/filters </span> </button></a>
                  <a href={`#wrapper_get_15`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeDailyFreeAlpha ? userMeDailyFreeAlpha.response : null, userMeDailyFreeBeta ? userMeDailyFreeBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/daily/recent </span> </button></a>
                  <a href={`#wrapper_get_16`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeRecentsAlpha ? userMeRecentsAlpha.response : null, userMeRecentsBeta ? userMeRecentsBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/recents </span> </button></a>
                  <a href={`#wrapper_get_17`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeChargesAlpha ? userMeChargesAlpha.response : null, userMeChargesBeta ? userMeChargesBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/charges </span> </button></a>

                  <a href={`#wrapper_get_19`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeInvitationsAlpha ? userMeInvitationsAlpha.response : null, userMeInvitationsBeta ? userMeInvitationsBeta.response : null)) ? "black" : "red" }}> /users/{"{me}"}/invitations </span> </button></a>
                  <a href={`#wrapper_get_20`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeV1Alpha ? userMeV1Alpha.response : null, userMeV1Beta ? userMeV1Beta.response : null)) ? "black" : "red" }}> /users/{"{me}"} </span> </button></a>
                  <a href={`#wrapper_get_21`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeMetaV1Alpha ? userMeMetaV1Alpha.response : null, userMeMetaV1Beta ? userMeMetaV1Beta.response : null)) ? "black" : "red" }}> /users/{"{me}"}/meta </span> </button></a>
                  <a href={`#wrapper_get_22`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(userMeDevicesAlpha ? userMeDevicesAlpha.response : null, userMeDevicesBeta ? userMeDevicesBeta.response : null)) ? "black" : "red" }}> /users/{"{me}"}/devices </span> </button></a>

                  {/* ==================================================================================== PUT ====================================================================================*/}

                  {/* <a href={`#wrapper_put_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha ? putUserMeAlpha.response : null, putUserMeBeta ? putUserMeBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"} </span></button></a>
                  <a href={`#wrapper_put_5`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putVerificationsAlpha ? putVerificationsAlpha.response : null, putVerificationsBeta ? putVerificationsBeta.response : null)) ? "black" : "red" }}> v2/verifications</span> </button></a>
                  <a href={`#wrapper_put_8`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(postUserChangeEmailAlpha ? postUserChangeEmailAlpha.response : null, postUserChangeEmailBeta ? postUserChangeEmailBeta.response : null)) ? "black" : "red" }}> /v2/users/me/email</span> </button></a>
                  <a href={`#wrapper_put_9`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMePasswordV2Alpha ? putUserMePasswordV2Alpha.response : null, putUserMePasswordV2Beta ? putUserMePasswordV2Beta.response : null)) ? "black" : "red" }}> /v2/users/me/password</span> </button></a>
                  <a href={`#wrapper_put_10`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserResetPasswordAlpha ? putUserResetPasswordAlpha.response : null, putUserResetPasswordBeta ? putUserResetPasswordBeta.response : null)) ? "black" : "red" }}> /v2/users/password/reset</span> </button></a>

                  <a href={`#wrapper_put_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMePassowrdAlpha ? putUserMePassowrdAlpha.response : null, putUserMePasswordBeta ? putUserMePasswordBeta.response : null)) ? "black" : "red" }}> /users/{"{me}"}/password</span> </button></a>
                  <a href={`#wrapper_put_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeAlpha ? putUserMeAlpha.response : null, putUserMeBeta ? putUserMeBeta.response : null)) ? "black" : "red" }}> /users/{"{me}"}/username</span> </button></a>
                  <a href={`#wrapper_put_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(putUserMeSocialAlpha ? putUserMeSocialAlpha.response : null, putUserMeSocialBeta ? putUserMeSocialBeta.response : null)) ? "black" : "red" }}> /users/{"{me}"}/connect/{socialTypePut}</span> </button></a> */}

                  {/* ==================================================================================== POST ====================================================================================*/}

                  {/* <a href={`#wrapper_post_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(userAlpha ? userAlpha.response : null, userBeta ? userBeta.response : null)) ? "black" : "red" }}> /users/signin</span> </button></a>
                  <a href={`#wrapper_post_6`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(postUserSignupAlpha ? postUserSignupAlpha.response : null, postUserSignupBeta ? postUserSignupBeta.response : null)) ? "black" : "red" }}> /users/signup</span> </button></a>

                  <a href={`#wrapper_post_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(putUserMeUnregisterAlpha ? putUserMeUnregisterAlpha.response : null, putUserMeUnregisterBeta ? putUserMeUnregisterBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/unregister</span> </button></a>
                  <a href={`#wrapper_post_5`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(postVerificationSendEmailAlpha ? postVerificationSendEmailAlpha.response : null, postVerificationSendEmailBeta ? postVerificationSendEmailBeta.response : null)) ? "black" : "red" }}> v2/verifications/send-email</span> </button></a>
                  <a href={`#wrapper_post_7`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(postUserSendChangeEmailAlpha ? postUserSendChangeEmailAlpha.response : null, postUserSendChangeEmailBeta ? postUserSendChangeEmailBeta.response : null)) ? "black" : "red" }}> /v2/verifications/me/send-change-mail</span> </button></a>
                  <a href={`#wrapper_post_8`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-warning'>POST</span> <span style={{ color: (isEqual(postUserSendResetPasswordAlpha ? postUserSendResetPasswordAlpha.response : null, postUserSendResetPasswordBeta ? postUserSendResetPasswordBeta.response : null)) ? "black" : "red" }}> /v2/users/me/password/reset</span> </button></a> */}

                  {/* ==================================================================================== DEL ====================================================================================*/}

                  {/* <a href={`#wrapper_del_1`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserMeSocialAlpha ? delUserMeSocialAlpha.response : null, delUserMeSocialBeta ? delUserMeSocialBeta.response : null)) ? "black" : "red" }}> v2/users/{"{me}"}/connections/{socialTypeDel} </span></button></a>
                  <a href={`#wrapper_del_2`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserByeAlpha ? delUserByeAlpha.response : null, delUserByeBeta ? delUserByeBeta.response : null)) ? "black" : "red" }}> v2/users/bye </span></button></a>
                  <a href={`#wrapper_del_3`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserDevicesAllAlpha ? delUserDevicesAllAlpha.response : null, delUserDevicesAllBeta ? delUserDevicesAllBeta.response : null)) ? "black" : "red" }}> users/{"{me}"}/devices/all </span></button></a>
                  <a href={`#wrapper_del_4`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-danger'>DEL &#160; </span> <span style={{ color: (isEqual(delUserDevicesByIdAlpha ? delUserDevicesByIdAlpha.response : null, delUserDevicesByIdBeta ? delUserDevicesByIdBeta.response : null)) ? "black" : "red" }}> users/{"{me}"}/devices/deviceId </span></button></a> */}

                  {/* =============== cms ================== */}
                  <hr></hr>

                  <a href={`#wrapper_get_18`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(getUserCmsSearchAlpha ? getUserCmsSearchAlpha.response : null, getUserCmsSearchBeta ? getUserCmsSearchBeta.response : null)) ? "black" : "red" }}> (cms) v2/users/user_name&limit=10 </span> </button></a>
                  <a href={`#wrapper_get_23`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(getUserInactiveCmsSearchUserAlpha ? getUserInactiveCmsSearchUserAlpha.response : null, getUserInactiveCmsSearchUserBeta ? getUserInactiveCmsSearchUserBeta.response : null)) ? "black" : "red" }}> (cms) /v2/inactive_users/user_name&limit=10 </span> </button></a>
                  <a href={`#wrapper_get_24`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(getRefundsCmsAlpha ? getRefundsCmsAlpha.response : null, getRefundsCmsBeta ? getRefundsCmsBeta.response : null)) ? "black" : "red" }}> (cms) /v2/refunds?_=refundId&limit=10&state=&userId=userId </span> </button></a>
                  <a href={`#wrapper_get_25`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(getInvitationsCmsAlpha ? getInvitationsCmsAlpha.response : null, getInvitationsCmsBeta ? getInvitationsCmsBeta.response : null)) ? "black" : "red" }}> (cms) /v2/users/userId/invitations?_=invitationId&limit=10 </span> </button></a>
                  <a href={`#wrapper_get_26`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} data-bs-toggle="tooltip" title="Popular"><span className='text-success'>GET</span> <span style={{ color: (isEqual(getDevicesCmsAlpha ? getDevicesCmsAlpha.response : null, getDevicesCmsBeta ? getDevicesCmsBeta.response : null)) ? "black" : "red" }}> (cms) /v2/users/userId/devices?_=deviceId </span> </button></a>
                  {/* <a href={`#wrapper_put_6`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(postUserCmsUnregisterAlpha ? postUserCmsUnregisterAlpha.response : null, postUserCmsUnregisterBeta ? postUserCmsUnregisterBeta.response : null)) ? "black" : "red" }}>{"(cms)"} v2/users/{"{me}"}/unregister </span> </button></a>
                  <a href={`#wrapper_put_7`}><button type="button" className="btn btn-md" style={{ fontSize: '.74rem', width: 240, textAlign: 'left' }} data-bs-toggle="tooltip" title="Popular"><span className='text-primary'>PUT&#160;</span> <span style={{ color: (isEqual(postUserCmsReregisterAlpha ? postUserCmsReregisterAlpha.response : null, postUserCmsReregisterBeta ? postUserCmsReregisterBeta.response : null)) ? "black" : "red" }}>{"(cms)"} v2/users/{"{me}"}/reregister </span> </button></a> */}

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