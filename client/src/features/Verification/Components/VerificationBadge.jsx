
import React from "react";

function VerificationBadge({ status }) {

    const badges = {
        verified: {
            label: "Verified",
            className: "badge-success"
        },

        suspicious: {
            label: "Suspicious",
            className: "badge-warning"
        },

        failed: {
            label: "Verification Failed",
            className: "badge-error"
        },

        pending: {
            label: "Pending Verification",
            className: "badge-pending"
        }
    };

    const badge = badges[status] || badges.pending;

    return (
        <span className={`verification-badge ${badge.className}`}>
            {badge.label}
        </span>
    );
}

export default VerificationBadge;
