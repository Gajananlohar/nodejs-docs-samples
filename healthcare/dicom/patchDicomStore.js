/**
 * Copyright 2019, Google, LLC
 * Licensed under the Apache License, Version 2.0 (the `License`);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an `AS IS` BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-warning-comments */

'use strict';

function main(
  projectId = process.env.GCLOUD_PROJECT,
  cloudRegion = 'us-central1',
  datasetId,
  dicomStoreId,
  pubsubTopic
) {
  // [START healthcare_patch_dicom_store]
  const {google} = require('googleapis');
  const healthcare = google.healthcare('v1beta1');

  async function patchDicomStore() {
    const auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/cloud-platform'],
    });
    google.options({auth});

    // TODO(developer): uncomment these lines before running the sample
    // const cloudRegion = 'us-central1';
    // const projectId = 'adjective-noun-123';
    // const datasetId = 'my-dataset';
    // const dicomStoreId = 'my-dicom-store';
    // const pubsubTopic = 'my-topic'
    const name = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
    const request = {
      name,
      updateMask: 'notificationConfig',
      resource: {
        notificationConfig: {
          pubsubTopic: `projects/${projectId}/topics/${pubsubTopic}`,
        },
      },
    };

    await healthcare.projects.locations.datasets.dicomStores.patch(request);
    console.log(
      `Patched DICOM store ${dicomStoreId} with Cloud Pub/Sub topic ${pubsubTopic}`
    );
  }

  patchDicomStore();
  // [END healthcare_patch_dicom_store]
}

// node patchDicomStore.js <projectId> <cloudRegion> <datasetId> <dicomStoreId> <pubsubTopic>
main(...process.argv.slice(2));
