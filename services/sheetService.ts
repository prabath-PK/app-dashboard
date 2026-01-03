
/**
 * Google Sheets Service Deactivated.
 * The application has switched to purely local persistence.
 */
export const sheetService = {
  async fetchApps() { return []; },
  async saveApp() { return true; },
  async deleteApp() { return true; }
};
