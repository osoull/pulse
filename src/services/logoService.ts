import { supabase } from '../lib/supabase';

// Logo variants
export type LogoVariant = 'dark' | 'light' | 'color';

// Cache the logo URLs after first fetch
let logoCache: Record<LogoVariant, string | null> = {
  dark: null,
  light: null,
  color: null
};

export async function uploadLogos() {
  try {
    // Upload dark logo
    const { error: darkError } = await supabase.storage
      .from('assets')
      .upload('logos/osoul-logo-dark.svg', darkLogoSvg, {
        contentType: 'image/svg+xml',
        upsert: true
      });

    if (darkError) throw darkError;

    // Upload light logo
    const { error: lightError } = await supabase.storage
      .from('assets')
      .upload('logos/osoul-logo-light.svg', lightLogoSvg, {
        contentType: 'image/svg+xml',
        upsert: true
      });

    if (lightError) throw lightError;

    // Upload color logo
    const { error: colorError } = await supabase.storage
      .from('assets')
      .upload('logos/osoul-logo-color.svg', colorLogoSvg, {
        contentType: 'image/svg+xml',
        upsert: true
      });

    if (colorError) throw colorError;

    // Clear cache after upload
    logoCache = { dark: null, light: null, color: null };

    return true;
  } catch (error) {
    console.error('Error uploading logos:', error);
    return false;
  }
}

export async function getLogoUrl(variant: LogoVariant = 'dark'): Promise<string> {
  try {
    // Return cached URL if available
    if (logoCache[variant]) {
      return logoCache[variant]!;
    }

    // Get public URL for the requested variant
    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(`logos/osoul-logo-${variant}.svg`);

    // Cache the URL
    logoCache[variant] = publicUrl;
    
    return publicUrl;
  } catch (error) {
    console.error('Error getting logo URL:', error);
    // Fallback to default logo URL
    return 'https://osoul.partners/wp-content/uploads/2024/01/osoul-capital-partners-logo.png';
  }
}

// SVG content for the logos
const darkLogoSvg = `<svg id="final_svg" viewBox="250.86500549316406 487.6000061035156 549.7659301757812 129.52493286132812" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark logo SVG content -->
</svg>`;

const lightLogoSvg = `<svg id="final_svg" viewBox="250.86500549316406 487.6000061035156 549.7659301757812 129.52493286132812" xmlns="http://www.w3.org/2000/svg">
  <!-- Light logo SVG content -->
</svg>`;

const colorLogoSvg = `<svg id="final_svg" viewBox="250.86500549316406 487.6000061035156 549.7659301757812 129.52493286132812" xmlns="http://www.w3.org/2000/svg">
  <!-- Color logo SVG content -->
</svg>`;