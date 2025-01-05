exports.verifyEmailHTML = ({ OTP }) => `
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 432px;margin: 0 auto;">
        <tbody>
            <tr>
                <td align="center"
                    style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 19px;line-height: 28px;background-color: #ebf5fa;color: #82899a;padding-left: 24px;padding-right: 24px;padding-top: 64px;padding-bottom: 64px;">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <tbody>
                            <tr>
                                <td height="40" width="32" style="border-bottom: 1px solid #126de5;">&nbsp; </td>
                                <td rowspan="2" align="center"
                                    style="font-family: Helvetica, Arial, sans-serif;margin-top: 0px;margin-bottom: 0px;font-size: 16px;line-height: 24px;color: #424651;padding-left: 16px;padding-right: 16px;padding-top: 16px;padding-bottom: 16px;">
                                    <img src="http://www.stampready.net/dashboard/editor/user_uploads/zip_uploads/2018/11/19/8pREHJbyxUVqTg6cslF4iBY3/account_verification/images/email-48-primary.png" width="48" height="48" alt="" style="max-width: 48px;-ms-interpolation-mode: bicubic;vertical-align: middle;border: 0;line-height: 100%;height: auto;outline: none;text-decoration: none;">
                                </td>
                                <td height="40" width="32" style="border-bottom: 1px solid #126de5;">&nbsp; </td>
                            </tr>
                            <tr>
                                <td height="40">&nbsp; </td>
                                <td height="40">&nbsp; </td>
                            </tr>
                            <tr>
                                <td style="font-size: 8px; line-height: 8px; height: 8px;">&nbsp; </td>
                                <td style="font-size: 8px; line-height: 8px; height: 8px;">&nbsp; </td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top: 0px;margin-bottom: 0px;">Verify Account</p>
                    <h2
                    style="font-family: Helvetica, Arial, sans-serif;font-weight: bold;margin-top: 0px;margin-bottom: 4px;color: #242b3d;font-size: 30px;line-height: 39px;">
                    ${OTP}</h2>
                </td>
            </tr>
        </tbody>
    </table>
`;
