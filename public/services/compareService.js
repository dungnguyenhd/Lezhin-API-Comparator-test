import axios from "axios";

// const proxyUrl = 'https://cors-proxy.fringe.zone/'
const API_BASE_URL_ALPHA = process.env.DOMAIN + process.env.REACT_APP_ALPHA_DOMAIN;
const API_BASE_URL_BETA = process.env.DOMAIN + process.env.REACT_APP_BETA_DOMAIN;
const token = process.env.REACT_APP_BETA_TOKEN;

class compareService {
  // add API service
  addNewAPI(header, endpoint, data, type) {
    const headers = header;

    if (type == 'get') {
      return axios.get(API_BASE_URL_ALPHA + endpoint, { data }, { headers });
    } else if (type == 'post') {
      return axios.post(API_BASE_URL_ALPHA + endpoint, { data }, { headers });
    } else if (type == 'put') {
      return axios.post(API_BASE_URL_ALPHA + endpoint, { data }, { headers });
    } else if (type == 'del') {
      return axios.post(API_BASE_URL_ALPHA + endpoint, { data }, { headers });
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

  // {{base_url}}/v2/users/{{me}/presents?offset=0&limit=50}
  getUserMePresentsAlpha(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_ALPHA + `/v2/users/${userId}/presents?offset=0&limit=50`, { headers })
  }

  getUserMePresentsBeta(access_token, userId, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.get(API_BASE_URL_BETA + `/v2/users/${userId}/presents?offset=0&limit=50`, { headers })
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

  // ====================================================== PUT =======================================================================================
  // ====================================================== PUT =======================================================================================

  putUserMeAlpha(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_ALPHA + `/v2/users/${userId}`, putData, { headers })
  }

  putUserMeBeta(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_BETA + `/v2/users/${userId}`, putData, { headers })
  }

  // ================== put user Me Password ==================

  putUserMePasswordAlpha(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/password`, putData, { headers })
  }

  putUserMePasswordBeta(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_BETA + `/users/${userId}/password`, putData, { headers })
  }

  // ================== put user Me Username ==================

  putUserMeUsernameAlpha(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/username`, putData, { headers })
  }

  putUserMeUsernameBeta(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_BETA + `/users/${userId}/username`, putData, { headers })
  }

  // ================== put user Me Connect Social ==================

  putUserMeSocialAlpha(access_token, userId, putData, socialType, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_ALPHA + `/users/${userId}/connect/${socialType}`, putData, { headers })
  }

  putUserMeSocialBeta(access_token, userId, putData, socialType, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.put(API_BASE_URL_BETA + `/users/${userId}/connect/${socialType}`, putData, { headers })
  }

  // ====================================================== POST =======================================================================================
  // ====================================================== POST =======================================================================================

  // ================== post user Me Connect Social ==================

  putUserMeUnregisterAlpha(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.post(API_BASE_URL_ALPHA + `/v2/users/${userId}/unregister`, putData, { headers })
  }

  putUserMeUnregisterBeta(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.post(API_BASE_URL_BETA + `/v2/users/${userId}/unregister`, putData, { headers })
  }

    // ====================================================== POST =======================================================================================
  // ====================================================== POST =======================================================================================

  // ================== del user Me Connect Social ==================

  delUserMeSocialAlpha(access_token, userId, putData, socialType, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.delete(API_BASE_URL_ALPHA + `/v2/users/${userId}/connections/${socialType}`, putData, { headers })
  }

  delUserMeSocialBeta(access_token, userId, putData, locale) {
    const headers = {
      'Content-Type': 'application/json',
      'x-lz-locale': locale,
      Authorization: `Bearer ${access_token}`,
    };
    return axios.delete(API_BASE_URL_BETA + `/v2/users/${userId}/connections/${socialType}`, putData, { headers })
  }

}

export default new compareService();