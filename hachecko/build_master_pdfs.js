const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const ROOT_DIR = __dirname;
const PRINT_DIR = path.join(ROOT_DIR, 'print');
const CHECKLIST_FILE = path.join(PRINT_DIR, 'hachecko.md');

// Helper to sanitize non-ascii text for standard PDF fonts
function sanitizeAscii(str) {
    return (str || '')
        .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => {
            const map = {
                'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
                'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
            };
            return map[c] || c;
        })
        .replace(/[^\x00-\x7F]/g, '_');
}

function parseDateFromInvoiceFolder(name) {
    const m = name.match(/(\d{2})-(\d{2})-(\d{4})/);
    if (m) return new Date(parseInt(m[3]), parseInt(m[2]) - 1, parseInt(m[1])).getTime();
    return 0;
}

// Dynamically extract applicant name and role from their personal hachecko.md
function getApplicantInfo(tag) {
    const personDir = path.join(ROOT_DIR, tag);
    const personChecklist = path.join(personDir, 'hachecko.md');

    let displayName = tag.toUpperCase();
    let subtitle = 'Zalacznik do wniosku o pobyt czasowy';

    if (fs.existsSync(personChecklist)) {
        const content = fs.readFileSync(personChecklist, 'utf8');
        const lines = content.split('\n');
        
        if (lines[0]) {
            const h1Match = lines[0].match(/#\s*(?:[^\w\s]+\s*)?([A-Za-z0-9_-]+)/);
            if (h1Match) displayName = h1Match[1].trim();
        }

        if (lines[1] && lines[1].includes('**')) {
            const cleanSub = lines[1].replace(/\*\*/g, '').replace(/Пакет документов:\s*/i, '').trim();
            if (cleanSub) subtitle = cleanSub;
        }
    }

    return {
        tag: tag,
        name: displayName,
        subtitle: sanitizeAscii(subtitle),
        outFile: `Dossier_${displayName.toUpperCase()}.pdf`
    };
}

function drawCoverPage(pdfDoc, fontBold, fontRegular, applicantInfo, docList) {
    const page = pdfDoc.insertPage(0, [595.28, 841.89]); // A4 (210mm x 297mm in points)
    const { width, height } = page.getSize();

    // 1. Black left separator band
    page.drawRectangle({
        x: 0,
        y: 0,
        width: 22,
        height: height,
        color: rgb(0.1, 0.1, 0.1),
    });

    // Top accent bar
    page.drawRectangle({
        x: 22,
        y: height - 10,
        width: width - 22,
        height: 10,
        color: rgb(0.2, 0.2, 0.2),
    });

    // 2. Header Box
    page.drawRectangle({
        x: 35,
        y: height - 85,
        width: width - 55,
        height: 65,
        color: rgb(0.95, 0.96, 0.97),
        borderColor: rgb(0.7, 0.75, 0.8),
        borderWidth: 1,
    });

    page.drawText('HACHECKO - TECZKA DO DRUKU / DOSSIER', {
        x: 48,
        y: height - 38,
        size: 9.5,
        font: fontBold,
        color: rgb(0.4, 0.4, 0.4),
    });

    page.drawText(applicantInfo.name.toUpperCase(), {
        x: 48,
        y: height - 58,
        size: 16,
        font: fontBold,
        color: rgb(0.05, 0.05, 0.05),
    });

    let safeSub = applicantInfo.subtitle;
    if (safeSub.length > 80) safeSub = safeSub.substring(0, 77) + '...';

    page.drawText(safeSub, {
        x: 48,
        y: height - 74,
        size: 9,
        font: fontRegular,
        color: rgb(0.25, 0.25, 0.25),
    });

    // 3. Spis Section Header
    page.drawText('SPIS ZAWARTOSCI PAKIETU (W CHRONOLOGICZNEJ KOLEJNOSCI DRUKU):', {
        x: 35,
        y: height - 102,
        size: 8.5,
        font: fontBold,
        color: rgb(0.1, 0.1, 0.1),
    });

    page.drawLine({
        start: { x: 35, y: height - 106 },
        end: { x: width - 20, y: height - 106 },
        thickness: 0.8,
        color: rgb(0.75, 0.75, 0.75),
    });

    const isTwoCol = docList.length > 22;

    if (isTwoCol) {
        const half = Math.ceil(docList.length / 2);
        const col1 = docList.slice(0, half);
        const col2 = docList.slice(half);

        const colWidth = (width - 65) / 2;
        const startY = height - 120;
        const lineSpacing = 14.5;
        const fontSize = 7.2;

        let y = startY;
        col1.forEach((item, idx) => {
            const numStr = (idx + 1).toString().padStart(2, '0');
            page.drawText(`${numStr}.`, {
                x: 36,
                y: y,
                size: fontSize,
                font: fontBold,
                color: rgb(0.3, 0.3, 0.3),
            });

            let name = sanitizeAscii(item.name);
            if (name.length > 34) name = name.substring(0, 32) + '..';

            page.drawText(name, {
                x: 52,
                y: y,
                size: fontSize,
                font: fontRegular,
                color: rgb(0.1, 0.1, 0.1),
            });

            page.drawText(`[${item.pages}s]`, {
                x: 35 + colWidth - 26,
                y: y,
                size: fontSize - 0.5,
                font: fontBold,
                color: rgb(0.4, 0.4, 0.4),
            });

            y -= lineSpacing;
        });

        page.drawLine({
            start: { x: 35 + colWidth + 5, y: startY + 5 },
            end: { x: 35 + colWidth + 5, y: y + lineSpacing - 3 },
            thickness: 0.5,
            color: rgb(0.85, 0.85, 0.85),
        });

        y = startY;
        col2.forEach((item, idx) => {
            const numStr = (half + idx + 1).toString().padStart(2, '0');
            const colX = 35 + colWidth + 12;

            page.drawText(`${numStr}.`, {
                x: colX,
                y: y,
                size: fontSize,
                font: fontBold,
                color: rgb(0.3, 0.3, 0.3),
            });

            let name = sanitizeAscii(item.name);
            if (name.length > 34) name = name.substring(0, 32) + '..';

            page.drawText(name, {
                x: colX + 16,
                y: y,
                size: fontSize,
                font: fontRegular,
                color: rgb(0.1, 0.1, 0.1),
            });

            page.drawText(`[${item.pages}s]`, {
                x: width - 42,
                y: y,
                size: fontSize - 0.5,
                font: fontBold,
                color: rgb(0.4, 0.4, 0.4),
            });

            y -= lineSpacing;
        });

    } else {
        let y = height - 125;
        const lineSpacing = 20;

        docList.forEach((item, idx) => {
            const numStr = (idx + 1).toString().padStart(2, '0');
            page.drawText(`${numStr}.`, {
                x: 40,
                y: y,
                size: 9.5,
                font: fontBold,
                color: rgb(0.3, 0.3, 0.3),
            });

            let name = sanitizeAscii(item.name);
            if (name.length > 65) name = name.substring(0, 62) + '...';

            page.drawText(name, {
                x: 62,
                y: y,
                size: 9.5,
                font: fontRegular,
                color: rgb(0.1, 0.1, 0.1),
            });

            page.drawText(`[ ${item.pages} str. ]`, {
                x: width - 90,
                y: y,
                size: 9,
                font: fontBold,
                color: rgb(0.35, 0.35, 0.35),
            });

            y -= lineSpacing;
        });
    }

    // 4. Footer Summary Box
    const totalPages = docList.reduce((sum, d) => sum + d.pages, 0);
    page.drawRectangle({
        x: 35,
        y: 20,
        width: width - 55,
        height: 38,
        color: rgb(0.93, 0.95, 0.98),
        borderColor: rgb(0.6, 0.75, 0.9),
        borderWidth: 1,
    });

    page.drawText(`LACZNIE DOKUMENTOW W TECZCE: ${docList.length} szt.  |  STRON DO DRUKU: ${totalPages + 1} str.`, {
        x: 48,
        y: 40,
        size: 9,
        font: fontBold,
        color: rgb(0.1, 0.25, 0.45),
    });

    page.drawText(`Podlaski Urzad Wojewodzki w Bialymstoku | Wizyta: 02.09.2026 r.`, {
        x: 48,
        y: 28,
        size: 8,
        font: fontRegular,
        color: rgb(0.3, 0.3, 0.3),
    });
}

async function mergePdfFiles(filePaths, outputPdfPath, applicantInfo) {
    const masterDoc = await PDFDocument.create();
    const fontBold = await masterDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await masterDoc.embedFont(StandardFonts.Helvetica);

    const docList = [];

    for (const filePath of filePaths) {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            continue;
        }

        try {
            const fileBytes = fs.readFileSync(filePath);
            const srcDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
            const pageIndices = srcDoc.getPageIndices();
            const copiedPages = await masterDoc.copyPages(srcDoc, pageIndices);

            for (const page of copiedPages) {
                masterDoc.addPage(page);
            }

            docList.push({
                name: path.basename(filePath),
                pages: copiedPages.length,
            });
        } catch (err) {
            console.error(`  ! Error reading ${filePath}:`, err.message);
        }
    }

    drawCoverPage(masterDoc, fontBold, fontRegular, applicantInfo, docList);

    const masterBytes = await masterDoc.save();
    fs.writeFileSync(outputPdfPath, masterBytes);
    console.log(`✅ Saved Master PDF: ${path.basename(outputPdfPath)} (${docList.length} docs, ${masterDoc.getPageCount()} pages, ${masterBytes.length} bytes)`);
}

async function run() {
    console.log("🚀 Hachecko Master PDF Builder: Parsing print/hachecko.md...\n");

    if (!fs.existsSync(CHECKLIST_FILE)) {
        console.error(`Checklist file not found: ${CHECKLIST_FILE}`);
        process.exit(1);
    }

    const content = fs.readFileSync(CHECKLIST_FILE, 'utf8');
    const lines = content.split('\n');

    // Dynamic queue map keyed by tag
    const applicantQueues = {};
    const discoveredTags = new Set();

    // Collect all tagged items
    for (const line of lines) {
        const match = line.match(/- \[[ xX]\] \*\*([^*]+)\*\*(.*)/);
        if (!match) continue;

        const itemName = match[1].trim();
        const tail = match[2];

        // Find all tags e.g. #mikhail #marharyta
        const tags = Array.from(tail.matchAll(/#([a-zA-Z0-9_-]+)/g)).map(m => m[1].toLowerCase());

        let resolvedFiles = [];
        let resolved = false;

        // Dynamic search across applicant directories and root
        const candidateFolders = ['', 'mikhail', 'marharyta', 'ekaterina', 'maryna'];
        for (const candidate of candidateFolders) {
            const checkPath = path.join(ROOT_DIR, candidate, itemName);
            if (fs.existsSync(checkPath)) {
                const stat = fs.statSync(checkPath);
                if (stat.isDirectory()) {
                    if (itemName.includes('ZUS_DRA')) {
                        const zusFiles = fs.readdirSync(checkPath).filter(f => f.endsWith('.pdf'));
                        const zusMonths = [
                            '08-2025', '09-2025', '10-2025', '11-2025', '12-2025',
                            '01-2026', '02-2026', '03-2026', '04-2026', '05-2026', '06-2026', '07-2026'
                        ];
                        for (const m of zusMonths) {
                            const dra = path.join(checkPath, `ZUS DRA ${m}.pdf`);
                            const upo = path.join(checkPath, `ZUS DRA ${m} UPO.pdf`);
                            if (fs.existsSync(dra)) resolvedFiles.push(dra);
                            if (fs.existsSync(upo)) resolvedFiles.push(upo);
                        }
                    } else if (itemName.includes('Faktury')) {
                        const subdirs = fs.readdirSync(checkPath, { withFileTypes: true })
                            .filter(d => d.isDirectory())
                            .map(d => d.name)
                            .sort((a, b) => parseDateFromInvoiceFolder(a) - parseDateFromInvoiceFolder(b));
                        
                        for (const sub of subdirs) {
                            const subPath = path.join(checkPath, sub);
                            const pdfs = fs.readdirSync(subPath).filter(f => f.endsWith('.pdf'));
                            const inv = pdfs.find(f => f.startsWith('faktura-vat-'));
                            const stmts = pdfs.filter(f => !f.startsWith('faktura-vat-')).sort();
                            if (inv) resolvedFiles.push(path.join(subPath, inv));
                            for (const s of stmts) resolvedFiles.push(path.join(subPath, s));
                        }
                    } else {
                        const allPdfs = fs.readdirSync(checkPath).filter(f => f.endsWith('.pdf')).sort();
                        for (const p of allPdfs) resolvedFiles.push(path.join(checkPath, p));
                    }
                    resolved = true;
                    break;
                } else if (stat.isFile() && itemName.endsWith('.pdf')) {
                    resolvedFiles.push(checkPath);
                    resolved = true;
                    break;
                }
            }
        }

        if (!resolved) {
            console.warn(`Warning: Could not resolve item "${itemName}"`);
        }

        // Add to applicant queues
        for (const tag of tags) {
            discoveredTags.add(tag);
            if (!applicantQueues[tag]) applicantQueues[tag] = [];
            applicantQueues[tag].push(...resolvedFiles);
        }
    }

    // Numbering prefixes for clean file ordering (01_, 02_, ...)
    let counter = 1;

    for (const tag of Array.from(discoveredTags).sort()) {
        const files = applicantQueues[tag];
        if (files && files.length > 0) {
            const applicantInfo = getApplicantInfo(tag);
            const prefix = counter.toString().padStart(2, '0');
            const outputFilename = `${prefix}_Dossier_${applicantInfo.name.toUpperCase().replace(/\s+/g, '_')}.pdf`;
            const outputPath = path.join(PRINT_DIR, outputFilename);

            console.log(`📦 [${prefix}] Assembling dossier for ${applicantInfo.name} (${files.length} items)...`);
            await mergePdfFiles(files, outputPath, applicantInfo);
            counter++;
        }
    }

    console.log("\n🎉 All Master Dossier PDFs successfully built!");
}

run().catch(console.error);
