/* empty css                      */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const s=[{id:11,title:"Project Proposal",author:"John Doe",uploadDate:"2025-02-12",documentUrl:"https://example.com/documents/project-proposal-v1.pdf"},{id:12,title:"Project Proposal (Revised)",author:"John Doe",uploadDate:"2025-02-15",documentUrl:"https://example.com/documents/project-proposal-v2.pdf"},{id:13,title:"Budget Forecast 2025",author:"Jane Smith",uploadDate:"2025-01-20",documentUrl:"https://example.com/documents/budget-forecast-2025.pdf"},{id:14,title:"Marketing Strategy Q1",author:"Emily Johnson",uploadDate:"2024-12-15",documentUrl:"https://example.com/documents/marketing-strategy-q1.pdf"},{id:15,title:"Employee Handbook (Updated)",author:"Michael Brown",uploadDate:"2024-11-30",documentUrl:"https://example.com/documents/employee-handbook-2024.pdf"},{id:16,title:"Technical Specification",author:"James Wilson",uploadDate:"2024-09-18",documentUrl:"https://example.com/documents/technical-spec-v3.pdf"},{id:17,title:"Training Schedule",author:"Laura Martinez",uploadDate:"2024-08-05",documentUrl:"https://example.com/documents/training-schedule-august.pdf"},{id:18,title:"Client Onboarding Guide",author:"Sophia Lee",uploadDate:"2024-06-10",documentUrl:"https://example.com/documents/onboarding-guide.pdf"},{id:19,title:"Sales Analysis 2024",author:"Sarah Davis",uploadDate:"2024-10-25",documentUrl:"https://example.com/documents/sales-analysis-2024.pdf"},{id:113,title:"Quarterly Performance Review",author:"Daniel Garcia",uploadDate:"2024-07-14",documentUrl:"https://example.com/documents/performance-review-q2.pdf"},{id:114,title:"Meeting Minutes",author:"Chris Anderson",uploadDate:"2024-05-22",documentUrl:"https://example.com/documents/meeting-minutes-may.pdf"},{id:115,title:"Product Roadmap",author:"James Wilson",uploadDate:"2025-03-12",documentUrl:"https://example.com/documents/product-roadmap-2025.pdf"},{id:116,title:"Financial Report Q1",author:"Jane Smith",uploadDate:"2025-02-28",documentUrl:"https://example.com/documents/financial-report-q1-2025.pdf"},{id:117,title:"Customer Feedback Compilation",author:"Sophia Lee",uploadDate:"2024-10-05",documentUrl:"https://example.com/documents/feedback-compilation.pdf"},{id:118,title:"Internal Audit Report",author:"Emily Johnson",uploadDate:"2024-09-02",documentUrl:"https://example.com/documents/audit-report-2024.pdf"}],l=document.querySelector(".documents-container"),g=document.querySelector("form"),y=document.getElementById("sort-selector"),p=document.getElementById("filter-selector"),h=document.getElementById("search-input");let m="",i=[];y.addEventListener("click",b);g.addEventListener("submit",f);h.addEventListener("input",f);l.addEventListener("click",o=>{const r=o.target.closest(".js-document-btn");if(r){D(r);return}const a=document.getElementById("speed-dial-menu-dropdown-alternative");a&&!a.contains(o.target)&&a.remove()});const x=o=>o.map(({id:r,title:a,author:n,uploadDate:e})=>`<li
      class="flex flex-col p-[16px] pr-[32px] border-solid rounded-xl outline sm:flex-row relative"
    >
      <h2 class="text-left grow-7">${a}</h2>
      <div class="flex grow-0 sm:gap-[16px]">
        <p>${n}</p>
        <time datetime="${e}">${e}</time>
      </div>
      <button data-documentid='${r}' class="js-document-btn absolute inset-y-0 right-[12px] transition-[scale] duration-250 ease-in-out hover:scale-[1.2] " type="button">
        <img src="/img/three-dots.svg" width="20" height="20" />
      </button>
    </li>`).join("");c(s);function b(o){o.preventDefault();const r=o.target.options[o.target.selectedIndex].value;if(r===m||r==="Sorted by")return;m=r;let a=[];const n=i.length>0?i:s;switch(r){case"name-up":a=n.toSorted((e,t)=>e.title.localeCompare(t.title));break;case"name-down":a=n.toSorted((e,t)=>t.title.localeCompare(e.title));break;case"author-up":a=n.toSorted((e,t)=>e.author.localeCompare(t.author));break;case"author-down":a=n.toSorted((e,t)=>t.author.localeCompare(e.author));break;case"date-up":a=n.toSorted((e,t)=>{const d=new Date(e.uploadDate),u=new Date(t.uploadDate);return d-u});break;case"date-down":a=n.toSorted((e,t)=>{const d=new Date(e.uploadDate);return new Date(t.uploadDate)-d});break}c(a)}function f(o){o.preventDefault();const r=p.options[p.selectedIndex].value,a=h.value;if(r!=="Filter by"){switch(r){case"name":i=s.filter(n=>n.title.toUpperCase().includes(a.toUpperCase()));break;case"author":i=s.filter(n=>n.author.toUpperCase().includes(a.toUpperCase()));break}c(i)}}function c(o){l.innerHTML="",o.length>0?l.insertAdjacentHTML("beforeend",x(o)):l.insertAdjacentHTML("beforeend","<p>No results...</p>")}function D(o){const r=document.getElementById("speed-dial-menu-dropdown-alternative");if(r){r.remove();return}console.log(o.dataset.documentid),o.insertAdjacentHTML("afterend",`
    <div id="speed-dial-menu-dropdown-alternative" class="absolute right-0 z-10 flex flex-col justify-end py-1 space-y-2 bg-white border border-gray-100 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600">
      <ul class="text-sm text-gray-500 dark:text-gray-300">
        <li>
          <a href="#" onclick="shareDocument('${o.dataset.documentid}')" class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
            Share
          </a>
        </li>
        <li>
          <a href="#" onclick="printDocument('${o.dataset.documentid}')" class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
            Print
          </a>
        </li>
        <li>
          <a href="#" onclick="saveDocument('${o.dataset.documentid}')" class="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
            Save
          </a>
        </li>
        <li>
          <a href="#" onclick="deleteDocument('${o.dataset.documentid}')" class="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
            Delete
          </a>
        </li>
      </ul>
    </div>`)}
//# sourceMappingURL=user-documents.js.map
