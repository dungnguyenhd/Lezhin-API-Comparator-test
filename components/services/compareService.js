import axios from "axios";

const API_BASE_URL_ALPHA = process.env.REACT_APP_ALPHA_DOMAIN;
let API_BASE_URL_BETA = process.env.REACT_APP_BETA_DOMAIN;
const API_CMS_URL_ALPHA = process.env.REACT_APP_ALPHA_CMS_DOMAIN;
const API_CMS_URL_BETA = process.env.REACT_APP_BETA_CMS_DOMAIN;
let token = process.env.REACT_APP_BETA_TOKEN;
const time = new Date();
class compareService {

  switchEnvironment(e) {
    switch (e) {
      case 1:
        API_BASE_URL_BETA = process.env.REACT_APP_BETA_DOMAIN;
        token = process.env.REACT_APP_BETA_TOKEN;
        break;
      case 2:
        API_BASE_URL_BETA = process.env.REACT_APP_QA_DOMAIN
        token = process.env.REACT_APP_QA_TOKEN;
        break;
      default:
        API_BASE_URL_BETA = process.env.REACT_APP_BETA_DOMAIN;
        token = process.env.REACT_APP_BETA_TOKEN;
        break;
    }
  }

  // {{base_url}}/users/signin
  postLoginAlpha(username, password, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
    };

    return axios.post(API_BASE_URL_ALPHA + "/users/signin", {
      account: {
        username: username,
        password: password,
      },
    }, { headers });
  }

  postLoginBeta(username, password, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${token}`,
    };

    return axios.post(API_BASE_URL_BETA + "/users/signin", {
      account: {
        username: username,
        password: password,
      },
    }, { headers });
  }

  // {{base_url}}/v2/users/{{me}}
  getUserMeAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}`, { headers })
  }

  getUserMeBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}`, { headers })
  }

  // {{base_url}}/users/{{me}}
  getUserMeV1Alpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/users/${userId}`, { headers })
  }

  getUserMeV1Beta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/users/${userId}`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/meta}
  getUserMeMetaAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/meta`, { headers })
  }

  getUserMeMetaBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/meta`, { headers })
  }

  // {{base_url}}/users/{{me}/metaV1}
  getUserMeMetaV1Alpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/users/${userId}/meta`, { headers })
  }

  getUserMeMetaV1Beta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/users/${userId}/meta`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/cohort}
  getUserMeCohortAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/cohort`, { headers })
  }

  getUserMeCohortBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/cohort`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/devices}
  getUserMeDevicesAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/users/${userId}/devices`, { headers })
  }

  getUserMeDevicesBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/users/${userId}/devices`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/devices}
  getUserMeCertificationsAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/certifications`, { headers })
  }

  getUserMeCertificationsBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/certifications`, { headers })
  }

  // {{base_url}}/v2/users/identity/${access_token}}
  getUserIdentityAlpha(access_token, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/identity/${access_token}`, { headers })
  }

  getUserIdentityBeta(access_token, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/identity/${access_token}`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/connections/{social_type}}
  getUserMeConnectionsSocialAlpha(access_token, userId, socialType, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/connections/${socialType}`, { headers })
  }

  getUserMeConnectionsSocialBeta(access_token, userId, socialType, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/connections/${socialType}`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/genres}
  getUserMeGenresAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/genres`, { headers })
  }

  getUserMeGenresBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/genres`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/balance}
  getUserMeBalanceAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/balance`, { headers })
  }

  getUserMeBalanceBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/balance`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/ga}
  getUserMeGAAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/ga`, { headers })
  }

  getUserMeGABeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/ga`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/badge_counts}
  getUserMeBadgeCountAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/badge_counts`, { headers })
  }

  getUserMeBadgeCountBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/badge_counts`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/presents?offset=0&limit=10}
  getUserMePresentsAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/presents?offset=0&limit=10`, { headers })
  }

  getUserMePresentsBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/presents?offset=0&limit=10`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/subscription?limit=30&offset=0&sort=createdAt&filter=all}
  getUserMeSubscriptionAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/subscriptions?limit=30&offset=0&sort=createdAt&filter=all`, { headers })
  }

  getUserMeSubscriptionBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/subscriptions?limit=30&offset=0&sort=createdAt&filter=all`, { headers })
  }

  // {{base_url}}/users/{{me}/invitations?page=0&limit=10}

  getUserMeInvitationsAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/users/${userId}/invitations?page=0&limit=10`, { headers })
  }

  getUserMeInvitationsBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/users/${userId}/invitations?page=0&limit=10`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/library/filters}

  getUserMeLibraryAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/library/filters`, { headers })
  }

  getUserMeLibraryBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/library/filters`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/dailyfree/recent}

  getUserMeDailyFreeAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/dailyfree/recent`, { headers })
  }

  getUserMeDailyFreeBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/dailyfree/recent`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/recents}

  getUserMeRecentsAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/recents`, { headers })
  }

  getUserMeRecentsBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/recents`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/charges}

  getUserMeChargesAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/charges`, { headers })
  }

  getUserMeChargesBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/charges`, { headers })
  }

  // {{base_url}}/v2/users/{{me}/redeem_attempt}

  getUserMeRedeemAttemptAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/redeem_attempt`, { headers })
  }

  getUserMeRedeemAttemptBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/redeem_attempt`, { headers })
  }

  // ====================================================== PUT =======================================================================================
  // ====================================================== PUT =======================================================================================

  // putUserMeAlpha(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/v2/users/${userId}`, putData, { headers })
  // }

  // putUserMeBeta(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/v2/users/${userId}`, putData, { headers })
  // }

  // // ================== put user Me Password ==================

  // putUserMePasswordAlpha(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/password`, putData, { headers })
  // }

  // putUserMePasswordBeta(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/users/${userId}/password`, putData, { headers })
  // }

  // // ================== put user Me Password V2==================

  // putUserMePasswordV2Alpha(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/password`, putData, { headers })
  // }

  // putUserMePasswordV2Beta(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/users/${userId}/password`, putData, { headers })
  // }

  // // ================== put user Me Username ==================

  // putUserMeUsernameAlpha(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/username`, putData, { headers })
  // }

  // putUserMeUsernameBeta(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/users/${userId}/username`, putData, { headers })
  // }

  // // ================== put user Me Connect Social ==================

  // putUserMeSocialAlpha(access_token, userId, putData, socialType, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/connect/${socialType}`, putData, { headers })
  // }

  // putUserMeSocialBeta(access_token, userId, putData, socialType, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/users/${userId}/connect/${socialType}`, putData, { headers })
  // }

  // // ====================================================== POST =======================================================================================
  // // ====================================================== POST =======================================================================================

  // // ================== post user Me Connect Social ==================

  // putUserMeUnregisterAlpha(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.post(API_BASE_URL_ALPHA + `/v2/users/${userId}/unregister`, putData, { headers })
  // }

  // putUserMeUnregisterBeta(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.post(API_BASE_URL_BETA + `/v2/users/${userId}/unregister`, putData, { headers })
  // }

  // ====================================================== DEL =======================================================================================
  // ====================================================== DEL =======================================================================================

  // ================== del user Me Connect Social ==================

  // delUserMeSocialAlpha(access_token, userId, putData, socialType, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_ALPHA + `/v2/users/${userId}/connections/${socialType}`, putData, { headers })
  // }

  // delUserMeSocialBeta(access_token, userId, putData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_BETA + `/v2/users/${userId}/connections/${socialType}`, putData, { headers })
  // }

  // // ================== del user logout Social ==================

  // delUserByeAlpha(access_token) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_ALPHA + `/v2/users/bye`, { headers })
  // }

  // delUserByeBeta(access_token) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_BETA + `/v2/users/bye`, { headers })
  // }

  // // ================== del user Me devices all Social ==================

  // delUserDevicesAllAlpha(access_token, userId, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_ALPHA + `/users/${userId}/devices/all`, { headers })
  // }

  // delUserDevicesAllBeta(access_token, userId, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_BETA + `/users/${userId}/devices/all`, { headers })
  // }

  // // ================== del user Me device by id Social ==================

  // delUserDevicesByIdAlpha(access_token, userId, deviceCode, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_ALPHA + `/users/${userId}/devices/${deviceCode}`, { headers })
  // }

  // delUserDevicesByIdBeta(access_token, userId, deviceCode, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.delete(API_BASE_URL_BETA + `/users/${userId}/devices/${deviceCode}`, { headers })
  // }


  // ====================================================== CMS API =======================================================================================
  // ====================================================== CMS API =======================================================================================


  // ================== Login to CMS  ==================

  postLoginCmsAlpha() {
    const qs = require('qs');
    const headers = {
      'authority': 'cms-dot-lezhincomix-alpha.appspot.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = {
      'client_id': 'lezhincomics-backoffice-user',
      'grant_type': 'password',
      'response_type': 'token',
      'username': 'tpvn.common',
      'password': 'Lezhin1!@'
    };
    const postData = qs.stringify(data);
    return axios.post(API_CMS_URL_ALPHA + '/_admin/tokens', postData, { headers });
  }

  postLoginCmsBeta() {
    const qs = require('qs');
    const headers = {
      'authority': 'cms-dot-lezhincomix-beta.appspot.com',
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    const data = {
      'client_id': 'lezhincomics-backoffice-user',
      'grant_type': 'password',
      'response_type': 'token',
      'username': 'tpvn.common',
      'password': 'Lezhin1!@'
    };
    const postData = qs.stringify(data);
    return axios.post(API_CMS_URL_BETA + '/_admin/tokens', postData, { headers });
  }

  // ====== ======= ====== PUT unregister ====== ======= ======

  // postUserCmsUnregisterAlpha(access_token, userId, postData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_CMS_URL_ALPHA + `/v2/users/${userId}/unregister`, postData, { headers })
  // }

  // postUserCmsUnregisterBeta(access_token, userId, postData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_CMS_URL_BETA + `/v2/users/${userId}/unregister`, postData, { headers })
  // }

  // ====== ======= ====== PUT Reregister ====== ======= ======

  // postUserCmsReregisterAlpha(access_token, userId, postData) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_CMS_URL_ALPHA + `/v2/users/${userId}/reregister`, postData, { headers })
  // }

  // postUserCmsReregisterBeta(access_token, userId, postData) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_CMS_URL_BETA + `/v2/users/${userId}/reregister`, postData, { headers })
  // }

  // ====== ======= ====== Get Search User By Name or Id ====== ======= ======

  getUserCmsSearchUserAlpha(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_ALPHA + `/v2/users/${search}?limit=10`, { headers })
  }

  getUserCmsSearchUserBeta(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_BETA + `/v2/users/${search}?limit=10`, { headers })
  }

  // ====== ======= ====== Post send email verifications ====== ======= ======

  // postVerificationSendEmailAlpha(email) {
  //   const data = { email: email };
  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };
  //   return axios.post(API_BASE_URL_ALPHA + `/v2/verifications/send-mail`, data, { headers })
  // }

  // postVerificationSendEmailBeta(email) {
  //   const data = { email: email };
  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };
  //   return axios.post(API_BASE_URL_BETA + `/v2/verifications/send-mail`, data, { headers })
  // }

  // ====== ======= ====== Put verifications ====== ======= ======

  // putVerificationsAlpha(putVerificationsData) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/v2/verifications`, putVerificationsData, { headers })
  // }

  // putVerificationsBeta(putVerificationsData) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/v2/verifications`, putVerificationsData, { headers })
  // }

  // ====== ======= ====== Put change email v2 ====== ======= ======

  // postUserChangeEmailAlpha(access_token, userId, postUserChangeEmail, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/v2/users/${userId}/email`, postUserChangeEmail, { headers })
  // }

  // postUserChangeEmailBeta(access_token, userId, postUserChangeEmail, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //     Authorization: `Bearer ${access_token}`,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/v2/users/${userId}/email`, postUserChangeEmail, { headers })
  // }

  // ====== ======= ====== Post user signup ====== ======= ======

  postUserSignupAlpha(postUserSignupData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
    };
    return axios.post(API_BASE_URL_ALPHA + `/users/signup`, postUserSignupData, { headers })
  }

  postUserSignupBeta(postUserSignupData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${token}`,
    };
    return axios.post(API_BASE_URL_BETA + `/users/signup`, postUserSignupData, { headers })
  }

  // ====== ======= ====== Post send change email verification ====== ======= ======

  postUserSendChangeEmailAlpha(access_token, userId, postUserSendChangeEmailData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.post(API_BASE_URL_ALPHA + `/v2/verifications/${userId}/send-change-mail`, postUserSendChangeEmailData, { headers })
  }

  postUserSendChangeEmailBeta(access_token, userId, postUserSendChangeEmailData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.post(API_BASE_URL_BETA + `/v2/verifications/${userId}/send-change-mail`, postUserSendChangeEmailData, { headers })
  }

  // ====== ======= ====== Post send reset password ====== ======= ======

  // postUserSendResetPasswordAlpha(username, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //   };
  //   return axios.post(API_BASE_URL_ALPHA + `/v2/users/${username}/password/reset`, { headers })
  // }

  // postUserSendResetPasswordBeta(username, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //   };
  //   return axios.post(API_BASE_URL_BETA + `/v2/users/${username}/password/reset`, { headers })
  // }

  // ====== ======= ====== Put reset password ====== ======= ======

  // putUserResetPasswordAlpha(putUserResetPasswordData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //   };
  //   return axios.put(API_BASE_URL_ALPHA + `/v2/users/password/reset`, putUserResetPasswordData, { headers })
  // }

  // putUserResetPasswordBeta(putUserResetPasswordData, locale) {
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'x-lz-locale': locale,
  //   };
  //   return axios.put(API_BASE_URL_BETA + `/v2/users/password/reset`, putUserResetPasswordData, { headers })
  // }

  // ====== ======= ====== Get Search User By Name or Id ====== ======= ======

  getUserInactiveCmsSearchUserAlpha(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_ALPHA + `/v2/inactive_users/${search}&limit=10`, { headers })
  }

  getUserInactiveCmsSearchUserBeta(access_token, search) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_BETA + `/v2/inactive_users/${search}&limit=10`, { headers })
  }

  // ====== ======= ====== Get Search User By Name or Id ====== ======= ======

  getRefundsCmsAlpha(access_token, userId) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_ALPHA + `/v2/refunds?_=${time}&limit=50&state=&userId=${userId}`, { headers })
  }

  getRefundsCmsBeta(access_token, userId) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_BETA + `/v2/refunds?_=${time}&limit=50&state=&userId=${userId}`, { headers })
  }

  // ====== ======= ====== Get Search User By Name or Id ====== ======= ======

  getInvitationsCmsAlpha(access_token, userId) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_ALPHA + `/v2/users/${userId}/invitations?_=${time}&limit=20`, { headers })
  }

  getInvitationsCmsBeta(access_token, userId) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_CMS_URL_BETA + `/v2/users/${userId}/invitations?_=${time}&limit=20`, { headers })
  }

    // ====== ======= ====== Get Search User By Name or Id ====== ======= ======

    getDevicesCmsAlpha(access_token, userId) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      };
      return axios.get(API_CMS_URL_ALPHA + `/v2/users/${userId}/devices?_=${time}`, { headers })
    }

    getDevicesCmsBeta(access_token, userId) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      };
      return axios.get(API_CMS_URL_BETA + `/v2/users/${userId}/devices?_=${time}`, { headers })
    }

  // ===============================================================
}

export default new compareService();