/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PlatformIcon } from './platform-icon';

export const Favicon = () => (
  <div className="w-[108px] h-[108px] rounded-[26px] border border-solid border-[rgba(253,198,177,0.55)] bg-[linear-gradient(160deg,#FFF8F4_0%,#FFEDE4_100%)] flex items-center justify-center shadow-[0_14px_30px_rgba(235,141,119,0.22)]">
    <PlatformIcon size={72} />
  </div>
);
