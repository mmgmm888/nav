import { Injectable, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SpeedInsightsService {
  private platformId = inject(PLATFORM_ID)

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initSpeedInsights()
    }
  }

  private initSpeedInsights(): void {
    try {
      // Dynamically import and inject Speed Insights
      import('@vercel/speed-insights').then((module) => {
        if (module.injectSpeedInsights) {
          module.injectSpeedInsights()
        }
      })
    } catch (error) {
      console.warn('Failed to initialize Vercel Speed Insights:', error)
    }
  }
}
